'use client'

import { AssetInformation } from "@/components";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { useAssetStore } from "@/store";
import { TableCell, Button, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

export function AssetTableRow(props: { asset: AssetDTO }) {
  const { asset } = props


  const a = useAssetStore(useShallow((state) => (state.assets.find(stateAsset => stateAsset.symbol === asset.symbol))))

  const newAsset = a || asset

  return (
    <TableRow>
      <TableCell>
        <AssetInformation
          data={{
            imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
            label: newAsset.name
          }}
        />
      </TableCell>
      <TableCell>{newAsset.symbol}</TableCell>
      <TableCell>{newAsset.price}</TableCell>
      <TableCell>
        <Button color="blue" size="xs" as={Link} href={`/assets/${newAsset.symbol}`}>Comprar/Vender</Button>
      </TableCell>
    </TableRow>
  )
}