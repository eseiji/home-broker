import { Table } from "@/components/table";
import { getOrders } from "@/data/services/orders/get";
import { Card, TableCell, TableHeadCell, TableRow, } from "flowbite-react";

export async function OrderHistory({ className }: { className?: string }) {
  const orders = await getOrders("c53f2227-3588-4d74-b7dc-f14d29c0c6ae")
  return (
    <Card className={className}>
      <div className="flex flex-col gap-2 justify-start w-full h-full">
        <span className="text-2xl font-bold">Histórico de ordens</span>

        <div className="overflow-x-auto w-full">
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
        </div>
      </div>
    </Card>
  )
}