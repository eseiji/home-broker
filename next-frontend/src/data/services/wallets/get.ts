import { API_URL } from "@/data/constants";
import { WalletDto } from "@/data/dtos/wallet-dto";

export async function getWallets(): Promise<WalletDto[]> {
  const res = await fetch(`${API_URL}/wallets`, {
    method: "GET",
  });

  return res.json()
}

export async function getWallet(walletId: string): Promise<WalletDto> {
  const res = await fetch(`${API_URL}/wallets/${walletId}`, {
    method: "GET",
  });

  return res.json()
}