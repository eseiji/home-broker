import { AssetDTO } from "./asset-dto"

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

export interface OrderDto {
  _id: string

  asset: AssetDTO
  shares: number
  partial: number
  price: string

  type: OrderType
  status: OrderStatus

  createdAt: Date
  updatedAt: string
}

