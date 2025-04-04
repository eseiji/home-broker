import { AssetSync } from "@/components/asset-sync";
import { WalletList } from "@/components/wallet-list";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { WalletAssetTableRow } from "./table-row";

export const walletId = "cc986b73-9106-452a-934d-3e1ef4e8d985"

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
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>

          <TableBody>
            {wallet.assets.map((walletAsset, index) => {
              return (
                <WalletAssetTableRow walletAsset={walletAsset} key={index} />
                // <TableRow key={index}>
                //   <TableCell>
                //     <AssetInformation

                //       data={{
                //         imageUrl: "https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg",
                //         label: walletAsset.asset.name
                //       }}
                //     /></TableCell>
                //   <TableCell>{walletAsset.asset.price}</TableCell>
                //   <TableCell>{walletAsset.shares}</TableCell>
                //   <TableCell>
                //     <Button color="blue" as={Link} href={`/assets/${walletAsset.asset.symbol}`}>Comprar/Vender</Button>
                //   </TableCell>
                // </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </div>
      <AssetSync assetsSymbols={wallet.assets.map(asset => asset.asset.symbol)} />
    </div>
  );
}
