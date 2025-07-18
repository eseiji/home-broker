import { walletId } from "@/app/(protected)/page";
import { AssetInformation, TabItem } from "@/components";
import { OrderForm } from "@/components/order-form";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { OrderType } from "@/data/dtos/order-dto";
import { Card, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./asset-chart-component";
import { AssetDailyDTO } from "@/data/dtos/asset-daily-dto";
import { Time } from "lightweight-charts";
import { AssetPrice } from "../asset-price";
import { AssetSync } from "@/components/asset-sync";


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

  const chartData = assetDailies.map(assetDaily => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: Number(assetDaily.price)
  }))

  return (
    <div className="flex flex-col space-y-5 flex-grow w-full">
      <div className="flex flex-col space-y-2">

        <AssetInformation data={{
          label: asset.name, imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
        }} />

        <AssetPrice asset={asset} />
      </div>

      <div className="flex flex-col gap-2">
        <Card>
          <AssetChartComponent asset={{
            ...asset,
            id: asset._id
          }} data={chartData} />
        </Card>
      </div>
      <div className="w-1/2">
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
  )
}