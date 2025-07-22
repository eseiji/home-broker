"use client";

import {
  Button,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SecondaryNavbar() {
  const params = useParams();
  const walletId = params.id;
  // Valor fictício por enquanto - depois pode vir de uma store ou API
  const totalPatrimony = "R$ 125.450,00";

  return (
    <FlowbiteNavbar fluid className="bg-gray-100 border-b border-gray-200 py-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <Button
            as={Link}
            href="/wallets"
            className="text-white bg-gray-500 px-4 py-2 rounded-md transition-colors font-medium"
          >
            Minhas carteiras
          </Button>

          <div>
            <p className="text-gray-600 text-sm">Patrimônio total</p>
            <p className="text-2xl font-bold text-gray-800">{totalPatrimony}</p>
          </div>
        </div>

        <div className="flex">
          <Button
            as={Link}
            href={`/wallets/${walletId}/trade`}
            className="text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Negociar
          </Button>
        </div>
      </div>
    </FlowbiteNavbar>
  );
} 