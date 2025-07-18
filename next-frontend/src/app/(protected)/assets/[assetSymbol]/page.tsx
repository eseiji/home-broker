import { walletId } from "@/app/(protected)/page";
import { AssetInformation, TabItem } from "@/components";
import { OrderForm } from "@/components/order-form";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { OrderType } from "@/data/dtos/order-dto";
import { Card, TableCell, TableHeadCell, TableRow, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./asset-chart-component";
import { AssetDailyDTO } from "@/data/dtos/asset-daily-dto";
import { Time } from "lightweight-charts";
import { AssetPrice } from "../asset-price";
import { AssetSync } from "@/components/asset-sync";
import { getOrders } from "@/data/services/orders/get";
import { Table } from "@/components/table";
import { OrderHistory } from "./order-history";
import { BuySellForm } from "./form";


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
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-col">
        <AssetInformation
          data={{
            label: asset.name,
            imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
          }}
        />

        <AssetPrice asset={asset} />
      </div>

      <div className="grid grid-cols-6 gap-5 w-full">
        <BuySellForm asset={asset} walletId={walletId || ""} className="col-span-2" />

        <Card className="w-full col-span-4">
          <AssetChartComponent
            asset={{
              ...asset,
              id: asset._id
            }}
            data={chartData}
          />
        </Card>
      </div>

      <OrderHistory className="max-h-[500px] overflow-y-auto" />
    </div>
  )
}