'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { TabItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import AssetsTab from "./assets-tab";
import OrdersTab from "./orders-tab";


export const walletId: string | null = null

export default function WalletPage() {

  const params = useParams();
  const walletId = params.id;

  const [wallet, setWallet] = React.useState<WalletDto>()

  React.useEffect(() => {
    if (walletId) {
      getWallet(walletId as string).then(setWallet)
    }
  }, [walletId])


  return (
    <div className="flex flex-col space-y-5 flex-grow w-full">
      <article className="w-full">
        <h2 className="font-bold">{wallet?.name}</h2>
      </article>
      <div className="overflow-x-auto w-full h-full">
        <Tabs variant="underline" className="[&>button]:cursor-pointer" theme={
          {
            "tablist": {
              "tabitem": {
                "base": "px-6",
                "variant": {
                  "underline": {
                    "base": "rounded-t-lg",
                    "active": {
                      "on": "border-assistant-3 text-assistant-3"
                    }
                  }
                },
              }
            },
          }
        }>
          <TabItem active title="Composição">
            <AssetsTab />
          </TabItem>
          <TabItem title="Ordens">
            <OrdersTab />
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}
