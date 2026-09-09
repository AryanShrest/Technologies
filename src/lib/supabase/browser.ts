import { createBrowserClient } from '@supabase/ssr'

import { supabasePublicConfig } from './config'

export function createBrowserSupabaseClient() {
  const { anonKey, url } = supabasePublicConfig()
  return createBrowserClient(url, anonKey)
}
