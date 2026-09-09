import { redirect } from 'next/navigation'

import { createServerSupabaseClient, createServiceSupabaseClient } from '@/lib/supabase/server'

export async function getAdminUser() {
  const authClient = await createServerSupabaseClient()
  const { data, error } = await authClient.auth.getUser()
  if (error || !data.user) return null

  const service = createServiceSupabaseClient()
  const { data: profile } = await service
    .from('admin_profiles')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle()
  return profile ? data.user : null
}

export async function requireAdminPage() {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  return user
}

export async function requireAdminApi() {
  const user = await getAdminUser()
  return user ? { service: createServiceSupabaseClient(), user } : null
}
