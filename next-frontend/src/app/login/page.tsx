'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/data/services/auth"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = await login(email, password)
      localStorage.setItem("token", token)
      router.push("/wallets")
    } catch (err) {
      console.log('err', err);

      toast.error("Credenciais inválidas")
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Entrar</button>
    </form>
  )
}
