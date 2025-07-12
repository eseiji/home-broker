
'use client'

import { AssetDTO } from "@/data/dtos/asset-dto"
import { socket } from "../socket-io"
import React from "react"
import { useAssetStore } from "@/store"

export function AssetSync(props: { assetsSymbols: string[] }) {
  const { assetsSymbols } = props
  const updateAsset = useAssetStore(state => state.changeAsset)

  React.useEffect(() => {
    socket.connect()

    socket.emit('joinAssets', { symbols: assetsSymbols })
    socket.on("assets/price-updated", (asset: AssetDTO) => {
      console.log(asset);

      updateAsset(asset)

    })

    return () => {
      socket.emit('leaveAssets', { symbols: assetsSymbols })
      socket.off("assets/price-updated")
    }
  }, [assetsSymbols, updateAsset])

  return null
}