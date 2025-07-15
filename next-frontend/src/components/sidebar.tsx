"use client";

import {
  Sidebar as FlowbiteSidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { walletId } from "@/app/(protected)/page";

export default function Sidebar() {
  const wallet_id = walletId;

  return (
    <FlowbiteSidebar aria-label="Default sidebar example">
      <SidebarItems className="pt-6 ">
        <SidebarItemGroup>
          <SidebarItem href="#">
            <Image
              alt="Full Cycle Invest"
              src="/images/logo.png"
              width={100}
              height={100}
            />
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href={`/wallets`} label="2">
            Carteiras
          </SidebarItem>
          <SidebarItem href={`/assets`} label="3">
            Ativos
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </FlowbiteSidebar>
  );
} 