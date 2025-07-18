'use client'

import Navbar from "@/components/nav-bar";
import { ToastContainer } from "@/components/toast-container";
import React from "react";
import { AuthProvider, useAuth } from "@/components/auth-provider";
import { LoadingSpinner } from "@/components/loading-spinner";
import Sidebar from "@/components/sidebar";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
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
    <AuthProvider>
      <ProtectedContent>
        {children}
      </ProtectedContent>
    </AuthProvider>
  );
}
