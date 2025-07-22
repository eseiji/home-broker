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
import { useAuthStore } from "@/stores/auth-store";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <FlowbiteNavbar fluid className="bg-assistant-1 text-white py-5">
      <div className="flex items-center gap-4">
        <NavbarBrand href="https://flowbite-react.com">
          <Image
            alt="Full Cycle Invest"
            src="/images/logo.png"
            width={200}
            height={200}
          />
        </NavbarBrand>
        {/* <span className="h-5 bg-white w-px" />
        <NavbarCollapse>
          <Link href={`/wallets`} passHref className="text-xl">
            Minhas carteiras
          </Link>
          <Link href={`/assets`} passHref className="text-xl">
            Ativos
          </Link>
        </NavbarCollapse> */}
      </div>
      <div className="flex md:order-2 items-center gap-4">
        <div className="content-center">
          Olá, {user?.name || 'Usuário'}
        </div>
        <button
          onClick={logout}
          className="text-white hover:text-gray-300 transition-colors"
        >
          Sair
        </button>
        <NavbarToggle />
      </div>
    </FlowbiteNavbar>
  );
}