'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { TabItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrders } from "@/data/services/orders/get";
import { OrderDto } from "@/data/dtos/order-dto";


export const walletId: string | null = null

export default function OrdersTab() {
  const params = useParams();
  const walletId = params.id;

  const [orders, setOrders] = React.useState<OrderDto[]>()

  React.useEffect(() => {
    if (walletId) {
      getOrders(walletId as string).then(setOrders)
    }
  }, [walletId])


  return (
    <Table className="w-full max-w-full table-fixed">
      <TableHead>
        <TableRow>
          <TableHeadCell>Código</TableHeadCell>
          <TableHeadCell>Ativo</TableHeadCell>
          <TableHeadCell>Quantidade</TableHeadCell>
          <TableHeadCell>Preço</TableHeadCell>
          <TableHeadCell>Preço total</TableHeadCell>
          <TableHeadCell>Operação</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {orders?.map((order, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{order.asset.symbol}</TableCell>
              <TableCell>{order.asset.name}</TableCell>
              <TableCell>{order.shares}</TableCell>
              <TableCell>{Number(order.asset.price)}</TableCell>
              <TableCell>{Number(order.asset.price) * order.shares}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
