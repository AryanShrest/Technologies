'use client'

import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

export function AdminLoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const data = new FormData(event.currentTarget)
    try {
      const client = createBrowserSupabaseClient()
      const result = await client.auth.signInWithPassword({
        email: String(data.get('email') ?? ''),
        password: String(data.get('password') ?? ''),
      })
      if (result.error) throw result.error
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Sign-in failed. Check your administrator credentials.')
      setLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={login}>
      <label className="block text-sm font-semibold text-slate-700">
        Email
        <input
          autoComplete="email"
          className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input
          autoComplete="current-password"
          className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </label>
      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <Button fullWidth loading={loading} size="large" type="submit">
        Sign in securely
      </Button>
    </form>
  )
}
