"use client";

import { useShallow } from "zustand/shallow";
import { useAssetStore } from "@/store";
import { AssetDTO } from "@/data/dtos/asset-dto";

export function AssetPrice(props: { asset: AssetDTO }) {
  const { asset } = props;
  const assetFetched = useAssetStore(
    useShallow((state) => state.assets.find((a) => a.symbol === asset.symbol))
  );

  const price = assetFetched ? assetFetched.price : props.asset.price;

  return <div className="ml-2 font-bold text-2xl">R$ {price}</div>;
} 