'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React from "react";
import { getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export const walletId: string | null = null

export default function WalletsPage() {

  const [wallets, setWallets] = React.useState<WalletDto[]>([])

  React.useEffect(() => {
    getWallets().then(setWallets)
  }, [])

  return (
    <div className="flex flex-col space-y-5 w-full">
      <article className="format">
        <h2 className="font-bold">Carteiras</h2>
      </article>

      <div className="flex gap-5 h-full w-full">

        {wallets.map((wallet, index) => {
          return (
            <Card className="max-w-sm h-fit" key={wallet._id}>
              <h5 className="text-2xl font-bold tracking-tight">
                {wallet.name}
              </h5>
              <p className="font-normal text-gray-700 ">
                {wallet.assets.length} ativos
              </p>
              <Button href={`/wallets/${wallet._id}`} as={Link} className="flex items-center gap-2 bg-assistant-3 cursor-pointer hover:bg-assistant-3/80 transition-colors w-full" type="button">
                Acessar
                <ArrowRight size={16} />
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
