'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { TabItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";


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
    <Table className="w-full max-w-full table-fixed">
      <TableHead>
        <TableRow>
          <TableHeadCell>Código</TableHeadCell>
          <TableHeadCell>Ativo</TableHeadCell>
          <TableHeadCell>Quantidade</TableHeadCell>
          <TableHeadCell>Preço unitário</TableHeadCell>
          <TableHeadCell>Preço total</TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {wallet?.assets.map((asset, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{asset.asset.symbol}</TableCell>
              <TableCell>{asset.asset.name}</TableCell>
              <TableCell>{asset.shares}</TableCell>
              <TableCell>{Number(asset.asset.price)}</TableCell>
              <TableCell>{Number(asset.asset.price) * asset.shares}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
