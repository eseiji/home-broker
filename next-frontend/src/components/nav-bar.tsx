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
import { walletId } from "@/app/page";

export default function Navbar() {
  // const searchParams = useSearchParams();
  // const wallet_id = searchParams.get("wallet_id");
  const wallet_id = walletId;
  return (
    <FlowbiteNavbar fluid rounded className="bg-black">
      <NavbarBrand href="https://flowbite-react.com">
        <Image
          className="mr-3"
          alt="Full Cycle Invest"
          src="https://st3.depositphotos.com/1001860/16375/i/450/depositphotos_163757632-stock-photo-amazon-logo-on-a-white.jpg"
          width={30}
          height={30}
        />
        <span className="text-xl">FullCycle Invest</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <div className="content-center">
          Olá {wallet_id?.substring(0, 5)}...
        </div>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href={`/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Carteira</NavbarLink>
        </Link>
        <Link href={`/assets/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Ativos</NavbarLink>
        </Link>
        <Link href={`/orders?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink href="#" className="text-xl">
            Ordens
          </NavbarLink>
        </Link>
      </NavbarCollapse>
    </FlowbiteNavbar>
  );
}