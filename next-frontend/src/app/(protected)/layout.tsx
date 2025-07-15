'use client'

import Navbar from "@/components/nav-bar";
import { ToastContainer } from "@/components/toast-container";
import React from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/data/services/auth";
import Sidebar from "@/components/sidebar";

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
    <div className="h-screen flex w-full">
      {/* <Navbar /> */}
      <Sidebar />
      <div className="container pt-10 pb-5 px-10 flex flex-grow">
        {children}
      </div>
    </div>
  );
}
