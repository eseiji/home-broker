'use client'

import { OrderDto, OrderType } from "@/data/dtos/order-dto";
import { AssetModel } from "@/domain/models";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { socket } from '../socket-io'
import { toast } from "react-toastify";
import { AssetPrice } from "@/app/(protected)/assets/asset-price";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NumericFormat } from 'react-number-format';

const orderSchema = z.object({
  shares: z
    .number({
      message: "Quantidade deve ser um número",
    })
    .min(1, "Quantidade deve ser maior que 0")
    .int("Quantidade deve ser um número inteiro"),

  orderType: z
    .string()
    .min(1, "Tipo de ordem é obrigatório"),

  price: z
    .number({
      message: "Preço deve ser um número",
    })
    .min(1, "Preço deve ser maior que 0"),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  asset: AssetModel, walletId: string, type: OrderType
}

export function OrderForm(props: OrderFormProps) {
  const { asset, type, walletId } = props

  const color = type === OrderType.BUY ? "text-blue-700" : "text-red-700"
  const translatedType = type === OrderType.BUY ? "Comprar" : "Vender"

  const inputColor = type === OrderType.BUY ? "info" : "failure"
  const buttonColor = type === OrderType.BUY ? "blue" : "red"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      shares: 1,
      orderType: "market",
      price: 1,
    }
  });

  async function onSubmit(data: OrderFormData) {
    try {
      socket.connect()

      const payload = {
        walletId: walletId,
        assetId: asset.id,
        shares: data.shares,
        price: data.price,
        type: type
      }
      console.log('payload', payload);

      // const newOrder: OrderDto = await socket.emitWithAck("orders/create", payload)
      // console.log('newOrder', newOrder);
      // toast(`Ordem de ${translatedType} de ${newOrder.shares} ações de ${newOrder.asset.symbol} criada com sucesso!`, {
      //   type: 'success',
      //   position: 'top-right'
      // })

    } catch (error) {
      toast.error("Erro ao criar ordem");
      console.error(error);
    }
  }

  const orderType = watch("orderType")

  console.log('buttonColor', buttonColor);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="shares">Quantidade</Label>
            <TextInput
              id="shares"
              type="number"
              min={1}
              step={1}
              color={errors.shares ? "failure" : "gray"}
              {...register("shares", { valueAsNumber: true })}
            />
            {errors.shares && (
              <p className="text-red-500 text-sm mt-1">{errors.shares.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="orderType">Tipo de ordem</Label>
            <Select
              id="orderType"
              color={errors.orderType ? "failure" : undefined}
              {...register("orderType")}
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </Select>
            {errors.orderType && (
              <p className="text-red-500 text-sm mt-1">{errors.orderType.message}</p>
            )}
          </div>

          {orderType === "market" && (
            <div className="flex items-center gap-2">
              <span>Preço atual: </span>
              <AssetPrice asset={{
                ...asset,
                _id: asset.id
              }} />
            </div>
          )}

          {orderType === 'limit' && (
            <div>
              <Label htmlFor="price">Preço</Label>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumericFormat
                    {...field}
                    value={value}
                    onValueChange={(values) => {
                      onChange(values.floatValue);
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    customInput={TextInput}
                    color={errors.price ? "failure" : "gray"}
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          )}

        </div>


        <Button
          type="submit"
          disabled={isSubmitting}
          color={buttonColor}
        >
          {isSubmitting ? "Processando..." : translatedType}
        </Button>
      </div>
    </form>
  )
}