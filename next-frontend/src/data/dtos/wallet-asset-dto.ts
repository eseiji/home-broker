import { AssetDTO } from "./asset-dto"

export interface WalletAssetDto {
  _id: string

  asset: AssetDTO

shares: number
}