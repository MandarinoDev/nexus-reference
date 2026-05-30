import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import { getSupabaseAnonKey, getSupabaseProjectUrl } from "@/lib/supabase/env"

export function createClient(): SupabaseClient | null {
  try {
    return createBrowserClient(
      getSupabaseProjectUrl(),
      getSupabaseAnonKey(),
    )
  } catch (error) {
    // Avoid crashing the whole app on the client if env vars are misconfigured.
    console.error("Supabase client init failed:", error)
    return null
  }
}
