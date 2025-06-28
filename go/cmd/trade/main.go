package main

import (
	"encoding/json"
	"fmt"
	"homebroker/internal/infra/kafka"
	"homebroker/internal/market/dto"
	"homebroker/internal/market/entity"
	"homebroker/internal/market/transformer"
	"sync"

	ckafka "github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

func main() {
	ordersIn := make(chan *entity.Order)
 	ordersOut := make(chan *entity.Order)
  wg := &sync.WaitGroup{}
	defer wg.Wait()

	kafkaMsgChan := make(chan *ckafka.Message)

	consumerConfig := &ckafka.ConfigMap{
		"bootstrap.servers": "localhost:9094",
		"group.id":          "trade",
		"auto.offset.reset": "latest",
		"security.protocol": "PLAINTEXT",
	}

	producerConfig := &ckafka.ConfigMap{
		"bootstrap.servers": "localhost:9094",
		"security.protocol": "PLAINTEXT",
	}
	producer := kafka.NewKafkaProducer(producerConfig)
	
	consumer := kafka.NewConsumer(consumerConfig, []string{"orders"})
	go consumer.Consume(kafkaMsgChan)

	book := entity.NewBook(ordersIn, ordersOut, wg)
	go book.Trade()

	go func() {
		for msg := range kafkaMsgChan {
			wg.Add(1)
			fmt.Println(string(msg.Value))
			var tradeInput dto.TradeInput
			err := json.Unmarshal(msg.Value, &tradeInput)
			if err != nil {
				panic(err)
			}
			
			order := transformer.TransformInput(tradeInput)
			ordersIn <- order
		}
	}()

	for res := range ordersOut {
		output := transformer.TranformOutput(res)
		jsonOutput,err := json.MarshalIndent(output, "", " ")
		if err != nil {
			panic(err)
		}

		fmt.Println(string(jsonOutput))
		producer.Publish(jsonOutput, []byte("orders"), "processed_orders")
	}
	
}