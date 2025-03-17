import { AssetInformation } from "@/components";
import { AssetDTO } from "@/data/dtos/asset-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, Button, TableRow } from "flowbite-react";

export async function getAssets(): Promise<AssetDTO[]> {
  const response = await fetch(`http://localhost:3000/assets`)
  return response.json()
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
                <TableRow key={asset._id}>
                  <TableCell>
                    <AssetInformation
                      data={{
                        imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
                        label: asset.name
                      }}
                    /></TableCell>
                  <TableCell>{asset.price}</TableCell>
                  <TableCell>
                    <Button color="blue">Comprar/Vender</Button>
                  </TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
