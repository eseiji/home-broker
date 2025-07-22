import { create } from 'zustand'
import { profile } from '@/data/services/auth'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, isAuthenticated: false })
    window.location.href = '/login'
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null })
      return
    }

    try {
      const userData = await profile()
      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error)
      localStorage.removeItem('token')
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }
})) 