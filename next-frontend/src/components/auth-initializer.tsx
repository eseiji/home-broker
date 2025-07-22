'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { LoadingSpinner } from './loading-spinner'

interface AuthInitializerProps {
  children: React.ReactNode
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  // Páginas públicas que não precisam de autenticação
  const publicRoutes = ['/login', '/register']
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    // Só verifica autenticação se ainda não verificou
    if (isLoading) {
      checkAuth()
    }
  }, [checkAuth, isLoading])

  useEffect(() => {
    // Se não está carregando e não está autenticado, redireciona para login
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.replace('/login')
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router])

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return <LoadingSpinner message="Verificando autenticação..." />
  }

  // Se está em rota pública, sempre renderiza
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Se está autenticado, renderiza o conteúdo
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Caso contrário, não renderiza nada (redirecionamento acontecerá)
  return null
} 