'use client'

import Navbar from "@/components/nav-bar";
import { ToastContainer } from "@/components/toast-container";
import React from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/data/services/auth";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    profile()
      .then(() => setLoading(false))
      .catch(() => {
        router.replace('/login')
      })
  }, [])

  if (loading) {
    return <div className="p-4 text-center">Verificando autenticação...</div>
  }


  return (
    <div className="h-screen flex flex-col w-full">
      <Navbar />
      <div className="container mx-auto  px-4 flex flex-grow">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}
