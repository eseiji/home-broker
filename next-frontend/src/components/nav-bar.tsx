"use client";

import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Sidebar
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import { walletId } from "@/app/(protected)/page";

export default function Navbar() {
  // const searchParams = useSearchParams();
  // const wallet_id = searchParams.get("wallet_id");
  const wallet_id = walletId;
  return (
    <FlowbiteNavbar fluid className="bg-assistant-1 text-white py-5">
      <div className="flex items-center gap-4">
        <NavbarBrand href="https://flowbite-react.com">
          <Image
            className="p-1 bg-assistant-5 rounded"
            alt="Full Cycle Invest"
            src="/images/logo.png"
            width={200}
            height={200}
          />
        </NavbarBrand>
        <span className="h-5 bg-white w-px" />
        <NavbarCollapse>
          <Link href={`/wallets`} passHref className="text-xl">
            Minhas carteiras
          </Link>
          <Link href={`/assets`} passHref className="text-xl">
            Ativos
          </Link>
        </NavbarCollapse>
      </div>
      <div className="flex md:order-2">
        <div className="content-center">
          Olá {wallet_id?.substring(0, 5)}...
        </div>
        <NavbarToggle />
      </div>
    </FlowbiteNavbar>
  );
}