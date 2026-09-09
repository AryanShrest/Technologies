import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

import { supabasePublicConfig, supabaseServiceConfig } from './config'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const { anonKey, url } = supabasePublicConfig()
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (items) => {
        try {
          for (const { name, options, value } of items) cookieStore.set(name, value, options)
        } catch {
          // Server Components cannot write cookies; route handlers and actions can.
        }
      },
    },
  })
}

export function createServiceSupabaseClient() {
  const { serviceRoleKey, url } = supabaseServiceConfig()
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
