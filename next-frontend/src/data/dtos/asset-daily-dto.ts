import { AssetDTO } from "./asset-dto"

export interface AssetDailyDTO {
  _id: string
  asset: AssetDTO
  date: string
  price: string
}