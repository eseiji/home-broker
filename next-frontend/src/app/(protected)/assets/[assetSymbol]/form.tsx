import { OrderForm } from "@/components/order-form";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { OrderType } from "@/data/dtos/order-dto";
import { Card, TabItem, Tabs } from "flowbite-react";

export function BuySellForm({ asset, walletId, className }: { asset: AssetDTO, walletId: string, className?: string }) {
  return (
    <Card className={className}>
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
  )
}