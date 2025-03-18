'use client'

import { AssetInformation } from "@/components";
import { ChartComponent, ChartComponentRef } from "@/components/chart";
import { AssetModel } from "@/domain/models";
import React from "react";

interface AssetChartComponentProps {
  asset: AssetModel
}

export function AssetChartComponent({ asset }: AssetChartComponentProps) {

  const chartRef = React.useRef<ChartComponentRef>(null)

  return (
    <ChartComponent ref={chartRef} header={<AssetInformation data={{
      label: asset.name,
      imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg"
    }} />} />
  )

}