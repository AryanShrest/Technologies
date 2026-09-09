import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.next()

  let response = NextResponse.next({ request })
  const client = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => {
        for (const { name, value } of items) request.cookies.set(name, value)
        response = NextResponse.next({ request })
        for (const { name, options, value } of items) response.cookies.set(name, value, options)
      },
    },
  })
  await client.auth.getUser()
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
