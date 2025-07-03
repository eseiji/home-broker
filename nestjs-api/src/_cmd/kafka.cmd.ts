import { NestFactory } from '@nestjs/core';
import { ConfluentKafkaServer } from '../kafka/confluent-kafka-server';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new ConfluentKafkaServer({
      server: {
        'bootstrap.servers': 'localhost:9094',
      },
      consumer: { allowAutoTopicCreation: true, sessionTimeout: 10000, rebalanceTimeout: 10000 },
    })
  });
  console.log('Starting kafka server...')

  await app.listen();
}
bootstrap();
