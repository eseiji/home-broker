import { AssetInformation } from "@/components";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, Button, TableRow } from "flowbite-react";
import Link from "next/link";
import { AssetSync } from "@/components/asset-sync";
import { AssetTableRow } from "./table-row";

export async function getAssets(): Promise<AssetDTO[]> {
  const response = await fetch(`http://localhost:3000/assets`)
  const json = await response.json()
  console.log('json', json);

  return json
}

export default async function AssetsPage() {
  const assets = await getAssets()

  return (
    <div className="flex flex-col space-y-5 flex-grow w-full">
      <article className="format">
        <h1>Ativos</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>

          <TableBody>
            {assets.map((asset) => {
              return (
                <AssetTableRow asset={asset} key={asset._id} />
              )
            })}

          </TableBody>
        </Table>
      </div>

      <AssetSync assetsSymbols={assets.map(asset => asset.symbol)} />
    </div>
  );
}
