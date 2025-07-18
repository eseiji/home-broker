import { walletId } from "@/app/(protected)/page";
import { AssetInformation, TabItem } from "@/components";
import { OrderForm } from "@/components/order-form";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { OrderType } from "@/data/dtos/order-dto";
import { Card, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./asset-chart-component";
import { AssetDailyDTO } from "@/data/dtos/asset-daily-dto";
import { Time } from "lightweight-charts";
import { AssetPrice } from "../asset-price";
import { AssetSync } from "@/components/asset-sync";
import { getOrders } from "@/data/services/orders/get";


export async function getAsset(symbol: string): Promise<AssetDTO> {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`)

  const json = await response.json()

  return json
}

export async function getAssetDailies(assetSymbol: string): Promise<AssetDailyDTO[]> {
  const response = await fetch(`http://localhost:3000/assets/${assetSymbol}/dailies`)
  const json = await response.json()

  return json
}


export default async function AssetDashboard({ params }: { params: Promise<{ assetSymbol: string }> }) {
  const { assetSymbol } = await params

  const asset = await getAsset(assetSymbol)

  const assetDailies = await getAssetDailies(asset.symbol)


  const orders = await getOrders(walletId)

  const chartData = assetDailies.map(assetDaily => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: Number(assetDaily.price)
  }))

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <AssetInformation
          data={{
            label: asset.name,
            imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
          }}
        />

        <AssetPrice asset={asset} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col space-y-5 w-full col-span-2">
          <div className="flex flex-col gap-2">
            <Card>
              <AssetChartComponent asset={{
                ...asset,
                id: asset._id
              }} data={chartData} />
            </Card>
          </div>

          <div className="w-full grid grid-cols-2 gap-5">
            <Card>
              <Tabs variant="fullWidth">
                <TabItem title="Comprar">
                  <OrderForm asset={{
                    ...asset,
                    id: asset._id
                  }} walletId={walletId || ""} type={OrderType.BUY} />
                </TabItem>
                <TabItem
                  title="Vender"
                  className="[&.active]:bg-red-100 [&.active]:text-red-700 hover:bg-red-50 hover:text-red-600"
                >
                  <OrderForm asset={{
                    ...asset,
                    id: asset._id
                  }} walletId={walletId || ""} type={OrderType.SELL} />
                </TabItem>
              </Tabs>
            </Card>
          </div>
          <AssetSync assetsSymbols={[asset.symbol]} />
        </div>

        <Card className="col-span-1">
          <div className="flex flex-col gap-2 justify-start w-full h-full">
            <span className="text-2xl font-bold">Histórico de ordens</span>

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
        </Card>
      </div>
    </div>
  )
}