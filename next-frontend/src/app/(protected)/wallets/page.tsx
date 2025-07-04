'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React from "react";
import { getWallets } from "@/data/services/wallets/get";
import Link from "next/link";


export const walletId: string | null = null

export default function WalletsPage() {

  const [wallets, setWallets] = React.useState<WalletDto[]>([])

  React.useEffect(() => {
    getWallets().then(setWallets)
  }, [])


  console.log('wallets', wallets);


  return (
    <div className="flex flex-col space-y-5 flex-grow w-full">
      <article className="format">
        <h1>Carteiras</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Quantidade de ativos</TableHeadCell>
              <TableHeadCell>Acessar</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {wallets.map((wallet, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{wallet._id}</TableCell>
                  <TableCell>{wallet.assets.length}</TableCell>
                  <TableCell>
                    <Link href={`/wallets/${wallet._id}`}>Acessar</Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
