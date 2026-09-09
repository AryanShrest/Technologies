import { redirect } from 'next/navigation'

import { AdminLoginForm } from '@/components/admin/AdminLoginForm'
import { getAdminUser } from '@/lib/admin'
import { hasSupabaseConfig } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  if (hasSupabaseConfig() && (await getAdminUser())) redirect('/admin')

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-12" id="primary">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">CoreCraft CMS</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950">Administrator sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Manage homepage slides and the growing partner directory.
        </p>
        {hasSupabaseConfig() ? (
          <AdminLoginForm />
        ) : (
          <p className="mt-8 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Supabase is not configured. Add the variables documented in <code>.env.example</code>.
          </p>
        )}
      </section>
    </main>
  )
}
