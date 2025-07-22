'use client'

import Navbar from "@/components/nav-bar";
import { ToastContainer } from "@/components/toast-container";
import React from "react";
import { AuthInitializer } from "@/components/auth-initializer";
import { useAuthStore } from "@/stores/auth-store";
import { LoadingSpinner } from "@/components/loading-spinner";
import Sidebar from "@/components/sidebar";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuthStore()

  if (isLoading) {
    return <LoadingSpinner message="Verificando autenticação..." />
  }

  return (
    <div className="h-screen w-full">
      {/* <Sidebar /> */}
      <Navbar />
      <div className="container pt-10 pb-5 m-auto px-10 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthInitializer>
      <ProtectedContent>
        {children}
      </ProtectedContent>
    </AuthInitializer>
  );
}
