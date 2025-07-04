import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { WalletAssetTableRow } from "./table-row";


export const walletId: string | null = null
// export const walletId = "2b7b167d-6e74-48ed-9340-4e53e0b208d6"

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

  console.log('wallet', wallet);


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
            <TableRow>
              <TableHeadCell>Ativo</TableHeadCell>
              <TableHeadCell>Cotação</TableHeadCell>
              <TableHeadCell>Quantidade</TableHeadCell>
              <TableHeadCell>Comprar/Vender</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {wallet.assets.map((walletAsset, index) => {
              return (
                <WalletAssetTableRow walletAsset={walletAsset} key={index} />
              )
            })}

          </TableBody>
        </Table>
      </div>
      <AssetSync assetsSymbols={wallet.assets.map(asset => asset.asset.symbol)} />
    </div>
  );
}
