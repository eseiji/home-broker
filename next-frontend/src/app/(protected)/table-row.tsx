'use client'

import { AssetInformation } from "@/components";
import { WalletAssetDto } from "@/data/dtos/wallet-asset-dto";
import { useAssetStore } from "@/store";
import { TableCell, Button, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

export function WalletAssetTableRow(props: { walletAsset: WalletAssetDto }) {
  const { walletAsset } = props


  const a = useAssetStore(useShallow((state) => (state.assets.find(asset => asset.symbol === walletAsset.asset.symbol))))

  const asset = a || walletAsset.asset
  return (
    <TableRow>
      <TableCell>
        <AssetInformation
          data={{
            imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
            label: asset.name
          }}
        /></TableCell>
      <TableCell>{asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button color="blue" as={Link} href={`/assets/${asset.symbol}`}>Comprar/Vender</Button>
      </TableCell>
    </TableRow>
  )
}