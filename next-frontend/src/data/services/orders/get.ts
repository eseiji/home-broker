import { API_URL } from "@/data/constants";
import { OrderDto } from "@/data/dtos/order-dto";

export async function getOrders(walletId: string): Promise<OrderDto[]> {
  const res = await fetch(`${API_URL}/orders?walletId=${walletId}`, {
    method: "GET",
  });

  return res.json()
}