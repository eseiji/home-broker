import { AssetInformation } from "@/components";
import { AssetDTO } from "@/data/dtos/asset-dto";
import Link from "next/link";
import { AssetSync } from "@/components/asset-sync";
import { AssetTableRow } from "./table-row";
import { Table } from "@/components/table";
import { TableHeadCell } from "flowbite-react";

export async function getAssets(): Promise<AssetDTO[]> {
  const response = await fetch(`http://localhost:3000/assets`)
  const json = await response.json()

  return json
}

export default async function AssetsPage() {
  const assets = await getAssets()

  return (
    <div className="flex flex-col space-y-5 w-full">
      <article className="format">
        <h2 className="font-bold">Ativos</h2>
      </article>

      <Table.Root>
        <Table.Header>
          <TableHeadCell>Ativo</TableHeadCell>
          <TableHeadCell>Código</TableHeadCell>
          <TableHeadCell>Cotação</TableHeadCell>
          <TableHeadCell>Comprar/Vender</TableHeadCell>
        </Table.Header>

        <Table.Body>
          {assets.map((asset) => {
            return (
              <AssetTableRow asset={asset} key={asset._id} />
            )
          })}

        </Table.Body>
      </Table.Root>

      <AssetSync assetsSymbols={assets.map(asset => asset.symbol)} />
    </div>
  );
}
