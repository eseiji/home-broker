'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Table } from "@/components/table";
import { TableCell, TableHeadCell, TableRow } from "flowbite-react";


export const walletId: string | null = null

export default function AssetsTab() {

  const params = useParams();
  const walletId = params.id;

  const [wallet, setWallet] = React.useState<WalletDto>()

  React.useEffect(() => {
    if (walletId) {
      getWallet(walletId as string).then(setWallet)
    }
  }, [walletId])


  return (
    <Table.Root>
      <Table.Header>
        <TableHeadCell>Código</TableHeadCell>
        <TableHeadCell>Ativo</TableHeadCell>
        <TableHeadCell>Quantidade</TableHeadCell>
        <TableHeadCell>Preço médio</TableHeadCell>
        <TableHeadCell>Preço total</TableHeadCell>
      </Table.Header>

      <Table.Body>
        {wallet?.assets.map((asset, index) => {
          const avgPrice = Number(asset.asset.price) * asset.shares / asset.shares
          return (
            <TableRow key={index} className="">
              <TableCell>{asset.asset.symbol}</TableCell>
              <TableCell>{asset.asset.name}</TableCell>
              <TableCell>{asset.shares}</TableCell>
              <TableCell>{avgPrice}</TableCell>
              <TableCell>{Number(asset.asset.price) * asset.shares}</TableCell>
            </TableRow>
          )
        })}
      </Table.Body>
    </Table.Root>
  );
}
