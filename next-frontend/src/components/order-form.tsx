'use client'

import { OrderDto, OrderType } from "@/data/dtos/order-dto";
import { AssetModel } from "@/domain/models";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent } from "react";
import { socket } from '../socket-io'
import { toast } from "react-toastify";

interface OrderFormProps {
  asset: AssetModel, walletId: string, type: OrderType
}

export function OrderForm(props: OrderFormProps) {
  const { asset, type, walletId } = props

  const color = type === OrderType.BUY ? "text-blue-700" : "text-red-700"
  const translatedType = type === OrderType.BUY ? "Comprar" : "Vender"

  const inputColor = type === OrderType.BUY ? "info" : "failure"
  const buttonColor = type === OrderType.BUY ? "blue" : "failure"

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    socket.connect()

    const newOrder: OrderDto = await socket.emitWithAck("orders/create", data)

    console.log('newOrder', newOrder);


    toast(`Ordem de ${translatedType} de ${newOrder.shares} ações de ${newOrder.asset.symbol} criada com sucesso!`, {
      type: 'success',
      position: 'top-right'
    })

  }

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" defaultValue={asset.id} name="assetId" />
      <input type="hidden" defaultValue={walletId} name="walletId" />
      <input type="hidden" defaultValue={type} name="type" />

      <div>
        <div>
          <Label htmlFor="shares" value="Quantidade" className={color} />
        </div>

        <TextInput id="shares" name="shares" required type="number" min={1} step={1} defaultValue={1} color={inputColor} />
      </div>

      <div>
        <div>
          <Label htmlFor="price" value="Preço" className={color} />
        </div>

        <TextInput id="price" name="price" required type="string" min={1} step={1} defaultValue={1} color={inputColor} />
      </div>

      <Button type="submit" color={buttonColor}>{translatedType}</Button>
    </form>
  )

}