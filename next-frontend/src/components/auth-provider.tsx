'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { profile } from '@/data/services/auth'
import { LoadingSpinner } from './loading-spinner'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  logout: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
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
        const userData = await profile()
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    if (loading && !isAuthenticated) {
      checkAuth()
    }
  }, [router, isHydrated, loading, isAuthenticated])

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
    router.replace('/login')
  }

  if (!isHydrated) {
    return <LoadingSpinner message="Inicializando..." />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, logout, setUser }}>
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