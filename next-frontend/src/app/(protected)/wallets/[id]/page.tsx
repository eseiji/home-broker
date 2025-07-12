'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { TabItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsCoin, BsReceipt } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
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
        <h1 className="text-4xl font-bold">Carteira: {walletId}</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Tabs variant="underline">
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
