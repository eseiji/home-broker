'use client'

import { AssetInformation } from "@/components";
import { ChartComponent, ChartComponentRef } from "@/components/chart";
import { AssetModel } from "@/domain/models";
import { socket } from "../../../socket-io";
import { Time } from "lightweight-charts";
import React from "react";

interface AssetChartComponentProps {
  asset: AssetModel
  data?: { time: Time, value: number }[]
}

export function AssetChartComponent({ asset, data }: AssetChartComponentProps) {

  const chartRef = React.useRef<ChartComponentRef>(null)
  const { symbol } = asset

  React.useEffect(() => {
    socket.connect()
    socket.emit("joinAsset", { symbol })
    socket.on("assets-daily/created", (assetDaily) => {
      console.log('assetDaily', assetDaily);

      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: Number(assetDaily.price)
      })

    })

    return () => {
      socket.emit('leaveAsset', { symbol })
      socket.off("assets-daily/created")
    }
  }, [symbol])

  return (
    <ChartComponent ref={chartRef} header={<AssetInformation data={{
      label: asset.name,
      imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg"
    }} />} data={data} />
  )

}