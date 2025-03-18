import { AssetModel } from "./asset-model"

export interface WalletAssetModel {
  _id: string

  asset: AssetModel

  shares: number
}