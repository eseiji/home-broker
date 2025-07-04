import { WalletModel } from "@/domain/models";
import {
  Alert,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableHeadCell,
  TableBody,
} from "flowbite-react";
import Link from "next/link";

export async function getWallets(): Promise<WalletModel[]> {
  const response = await fetch(`http://localhost:3000/wallets`);

  return response.json();
}

export async function WalletList() {
  const wallets = await getWallets();
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <Alert color="failure">Nenhuma wallet escolhida</Alert>
      <article className="format">
        <h1>Carteiras existentes</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Acessar</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.map((wallet, key) => (
              <TableRow key={key}>
                <TableCell>{wallet._id}</TableCell>
                <TableCell>
                  <Link href={`/?wallet_id=${wallet._id}`}>Acessar</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}