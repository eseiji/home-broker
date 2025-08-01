'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { login, profile } from "@/data/services/auth"
import { toast } from "react-toastify"
import { useAuthStore } from "@/stores/auth-store"
import Link from "next/link"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setAuthenticated } = useAuthStore()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  })

  const handleLogin = async (data: LoginFormData) => {
    try {
      const token = await login(data.email, data.password)
      localStorage.setItem("token", token)

      // Buscar dados do usuário e definir na store
      const userData = await profile()
      setUser(userData)
      setAuthenticated(true)

      router.push("/wallets")
    } catch (err) {
      console.log('err', err);
      toast.error("Credenciais inválidas")
    }
  }

  return (
    <div className="bg-assistant-1 w-full h-full flex items-center justify-center">
      <div className="border border-assistant-2 bg-assistant-3 w-fit rounded-md p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Entrar</h1>
          <p className="text-gray-600 mt-2">Faça login em sua conta</p>
        </div>

        <form onSubmit={form.handleSubmit(handleLogin)} className="p-4 space-y-2">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              className={`border p-2 w-full rounded bg-white ${form.formState.errors.email ? 'border-red-500' : ''
                }`}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              {...form.register("password")}
              className={`border p-2 w-full rounded bg-white ${form.formState.errors.password ? 'border-red-500' : ''
                }`}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-assistant-1 mt-10 text-white p-2 w-full rounded disabled:opacity-50"
          >
            {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Não possui conta?{' '}
              <Link
                href="/register"
                className="text-assistant-1 hover:underline font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
