'use client'

import { AssetInformation } from "@/components";
import { ChartComponent, ChartComponentRef } from "@/components/chart";
import { AssetModel } from "@/domain/models";
import { socket } from "../../../../../../socket-io";
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
    console.log('symbol', symbol);
    socket.connect()
    socket.emit("joinAsset", { symbol })
    socket.on("assets-daily/created", (assetDaily) => {
      console.log('assetDaily', assetDaily);

      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: Number(assetDaily.price)
      })

    })

    // return () => {
    //   socket.emit('leaveAsset', { symbol })
    //   socket.off("assets-daily/created")
    // }
  }, [symbol])

  console.log('data', data);


  return (
    <ChartComponent ref={chartRef} data={data} />
  )

}