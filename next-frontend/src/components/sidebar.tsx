"use client";

import React from "react";
import {
  Sidebar as FlowbiteSidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex-shrink-0">
      <FlowbiteSidebar aria-label="Sidebar" className="h-full">
        <SidebarItems className="pt-6">
          <SidebarItemGroup>
            <SidebarItem href="#">
              <Image
                alt="Full Cycle Invest"
                src="/images/logo.png"
                width={100}
                height={100}
                priority
              />
            </SidebarItem>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem
              as={Link}
              href="/wallets"
              className={isActive("/wallets") ? "bg-gray-100" : ""}
            >
              Carteiras
            </SidebarItem>
            <SidebarItem
              as={Link}
              href="/assets"
              className={isActive("/assets") ? "bg-gray-100" : ""}
            >
              Ativos
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </FlowbiteSidebar>
    </div>
  );
};

export default Sidebar; 