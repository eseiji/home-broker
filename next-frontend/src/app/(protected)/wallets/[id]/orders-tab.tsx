'use client'

import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import React from "react";
import { getWallet, getWallets } from "@/data/services/wallets/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrders } from "@/data/services/orders/get";
import { OrderDto } from "@/data/dtos/order-dto";
import { Table } from "@/components/table";
import { TableCell, TableHeadCell, TableRow } from "flowbite-react";


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

  console.log("orders", orders)


  return (
    <Table.Root>
      <Table.Header>
        <TableHeadCell>Código</TableHeadCell>
        <TableHeadCell>Ativo</TableHeadCell>
        <TableHeadCell>Quantidade</TableHeadCell>
        <TableHeadCell>Preço médio</TableHeadCell>
        <TableHeadCell>Preço total</TableHeadCell>
        <TableHeadCell>Operação</TableHeadCell>
        <TableHeadCell>Data</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
      </Table.Header>

      <Table.Body>
        {orders?.map((order, index) => {
          const avgPrice = Number(order.asset.price) * order.shares / order.shares
          return (
            <TableRow key={index}>
              <TableCell>{order.asset.symbol}</TableCell>
              <TableCell>{order.asset.name}</TableCell>
              <TableCell>{order.shares}</TableCell>
              <TableCell>{avgPrice}</TableCell>
              <TableCell>{Number(order.asset.price) * order.shares}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          )
        })}
      </Table.Body>
    </Table.Root>
  );
}
