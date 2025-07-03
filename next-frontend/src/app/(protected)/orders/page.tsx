import { AssetInformation } from "@/components";
import { OrderDto } from "@/data/dtos/order-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, TableRow } from "flowbite-react";
import { walletId } from "../page";

export async function getOrders(walletId: string): Promise<OrderDto[]> {
  const response = await fetch(`http://localhost:3000/orders?walletId=${walletId}`)
  const json = await response.json()

  return json
}

export default async function OrdersPage() {
  const orders = await getOrders(walletId)

  return (
    <div className="flex flex-col space-y-5 flex-grow w-full">
      <article className="format">
        <h1>Ordens</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableRow>

              <TableHeadCell>Ativo</TableHeadCell>
              <TableHeadCell>Preço</TableHeadCell>
              <TableHeadCell>Quantidade</TableHeadCell>
              <TableHeadCell>Tipo</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!!orders.length && orders.map((order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell>
                    <AssetInformation
                      data={{
                        imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
                        label: order.asset.name
                      }}
                    /></TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.shares}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
