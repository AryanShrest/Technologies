import { create } from 'zustand'
import type { User } from '@/types/user'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    }
    set({ token })
  },
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
