import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ENDPOINTS } from '@/config/api'
import { useAuthStore } from '@/store/auth.store'
import type { User } from '@/types/user'

const getAuthHeaders = (token: string | null) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

export function useLogin() {
  const queryClient = useQueryClient()
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Login failed' }))
        throw new Error(err.message || 'Login failed')
      }
      return res.json() as Promise<{ accessToken: string; user: User }>
    },
    onSuccess: (result) => {
      setToken(result.accessToken)
      setUser(result.user)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const res = await fetch(ENDPOINTS.auth.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Registration failed' }))
        throw new Error(err.message || 'Registration failed')
      }
      return res.json()
    },
  })
}

export function useMe() {
  const token = useAuthStore((s) => s.token)
  const setUser = useAuthStore((s) => s.setUser)

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await fetch(ENDPOINTS.auth.me, {
        headers: getAuthHeaders(token),
        credentials: 'include',
      })
      if (!res.ok) {
        if (res.status === 401) {
          setUser(null)
        }
        throw new Error('Failed to fetch user')
      }
      const data = (await res.json()) as { user: User }
      setUser(data.user)
      return data
    },
    enabled: !!token,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const logout = useAuthStore((s) => s.logout)
  const token = useAuthStore((s) => s.token)

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(ENDPOINTS.auth.logout, {
        method: 'POST',
        headers: getAuthHeaders(token),
        credentials: 'include',
      })
      return res.json()
    },
    onSuccess: () => {
      logout()
      queryClient.clear()
    },
  })
}
