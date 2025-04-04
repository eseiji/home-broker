import { create } from "zustand"
import { AssetDTO } from "./data/dtos/asset-dto"

export type AssetStore = {
  assets: AssetDTO[]
  changeAsset: (asset: AssetDTO) => void
}

export const useAssetStore = create<AssetStore>((set) => ({
  assets: [],
  changeAsset: (asset) => set(state => {
    const assetIndex = state.assets.findIndex(stateAsset => stateAsset.symbol === asset.symbol)

    if (assetIndex === -1) return {assets: [...state.assets, asset]}

    const newAssets = [...state.assets]

    newAssets[assetIndex] = asset

    return {assets: newAssets}
  })
}))