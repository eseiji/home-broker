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
    <div className=" bg-assistant-1 w-full h-full flex items-center justify-center">
      <div className="border border-assistant-2 bg-assistant-3 w-fit rounded-md p-4">
        <form onSubmit={handleLogin} className="p-4 space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 w-full rounded bg-white"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full rounded bg-white"
          />
          <button type="submit" className="bg-assistant-1 mt-10 text-white p-2 w-full rounded">Entrar</button>
        </form>
      </div>
    </div>
  )
}
