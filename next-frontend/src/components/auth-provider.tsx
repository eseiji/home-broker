'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { profile } from '@/data/services/auth'
import { LoadingSpinner } from './loading-spinner'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const checkAuth = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        router.replace('/login')
        return
      }

      try {
        await profile()
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('token')
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    // Evitar múltiplas verificações
    if (loading && !isAuthenticated) {
      checkAuth()
    }
  }, [router, isHydrated, loading, isAuthenticated])

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.replace('/login')
  }

  if (!isHydrated) {
    return <LoadingSpinner message="Inicializando..." />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 