import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getSupabaseAnonKey, getSupabaseProjectUrl } from "@/lib/supabase/env"

export async function createClient() {
  const cookieStore = await cookies()
  type CookieToSet = {
    name: string
    value: string
    options?: Parameters<typeof cookieStore.set>[2]
  }

  return createServerClient(
    getSupabaseProjectUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Ignorado en Server Components de solo lectura
          }
        },
      },
    },
  )
}
