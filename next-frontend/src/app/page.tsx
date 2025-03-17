import { AssetInformation } from "@/components";
import { WalletDto } from "@/data/dtos/wallet-dto";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, Button, TableRow } from "flowbite-react";

export async function getWallet(walletId: string): Promise<WalletDto> {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`)
  return response.json()
}

export default async function Home() {
  const wallet = await getWallet('53f7e57b-221c-4443-a63a-8625fd4cf41b')
  console.log('wallet', wallet);

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
            {wallet.assets.map((walletAsset) => {
              return (
                <TableRow key={walletAsset._id}>
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
