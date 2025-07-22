'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { register, profile } from "@/data/services/auth"
import { toast } from "react-toastify"
import { useAuthStore } from "@/stores/auth-store"
import Link from "next/link"

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { setUser, setAuthenticated } = useAuthStore()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  })

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const token = await register(data.email, data.password, data.name)
      localStorage.setItem("token", token)

      // Buscar dados do usuário e definir na store
      const userData = await profile()
      setUser(userData)
      setAuthenticated(true)

      toast.success("Cadastro realizado com sucesso!")
      router.push("/wallets")
    } catch (err) {
      console.log('err', err);
      toast.error("Erro ao cadastrar usuário")
    }
  }

  return (
    <div className="bg-assistant-1 w-full h-full flex items-center justify-center">
      <div className="border border-assistant-2 bg-assistant-3 w-fit rounded-md p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>
          <p className="text-gray-600 mt-2">Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={form.handleSubmit(handleRegister)} className="p-4 space-y-2">
          <div>
            <input
              type="text"
              placeholder="Nome"
              {...form.register("name")}
              className={`border p-2 w-full rounded bg-white ${form.formState.errors.name ? 'border-red-500' : ''
                }`}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

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

          <div>
            <input
              type="password"
              placeholder="Confirmar senha"
              {...form.register("confirmPassword")}
              className={`border p-2 w-full rounded bg-white ${form.formState.errors.confirmPassword ? 'border-red-500' : ''
                }`}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-assistant-1 mt-10 text-white p-2 w-full rounded disabled:opacity-50"
          >
            {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Já possui conta?{' '}
              <Link
                href="/login"
                className="text-assistant-1 hover:underline font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 