import { WalletAssetModel } from "./wallet-asset-model"

export interface WalletModel {
  _id: string

  assets: WalletAssetModel[]

  createdAt: Date
  updatedAt: string
}