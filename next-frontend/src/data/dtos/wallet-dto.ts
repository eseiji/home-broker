import { WalletAssetDto } from "./wallet-asset-dto"

export interface WalletDto {
  _id: string
  name: string

  assets: WalletAssetDto[]

  createdAt: Date
  updatedAt: string
}