import { AssetInformation } from "@/components";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, Button, TableRow } from "flowbite-react";
import Link from "next/link";

export const walletId = "b14ffccf-41ea-44fd-8150-572846bfb1c3"

export async function getWallet(walletId: string): Promise<WalletDto> {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`)
  const json = response.json()
  return json
}

export default async function Home() {

  if (!walletId) {
    return (
      <WalletList />
    )
  }

  const wallet = await getWallet(walletId)

  if (!wallet) {
    return (
      <WalletList />
    )
  }

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
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>

          <TableBody>
            {wallet.assets.map((walletAsset, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <AssetInformation

                      data={{
                        imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
                        label: walletAsset.asset.name
                      }}
                    /></TableCell>
                  <TableCell>{walletAsset.asset.price}</TableCell>
                  <TableCell>{walletAsset.shares}</TableCell>
                  <TableCell>
                    <Button color="blue" as={Link} href={`/assets/${walletAsset.asset.symbol}`}>Comprar/Vender</Button>
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
