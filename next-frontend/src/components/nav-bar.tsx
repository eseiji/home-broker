"use client";

import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
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
    <FlowbiteNavbar fluid className="bg-[#1E3A8A] text-white">
      <div className="flex items-center gap-4">
        <NavbarBrand href="https://flowbite-react.com">
          <Image
            className="mr-3"
            alt="Full Cycle Invest"
            src="https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg"
            width={30}
            height={30}
          />
          <span className="text-xl">Invest</span>
        </NavbarBrand>
        <span className="h-5 bg-white w-px" />
        <NavbarCollapse>
          <Link href={`/?wallet_id=${wallet_id}`} passHref className="text-xl">
            Carteira
          </Link>
          <Link href={`/assets/?wallet_id=${wallet_id}`} passHref className="text-xl">
            Ativos
          </Link>
          <Link href={`/orders?wallet_id=${wallet_id}`} passHref className="text-xl">
            Ordens
          </Link>
        </NavbarCollapse></div>
      <div className="flex md:order-2">
        <div className="content-center">
          Olá {wallet_id?.substring(0, 5)}...
        </div>
        <NavbarToggle />
      </div>
    </FlowbiteNavbar>
  );
}