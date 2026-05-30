function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseProjectUrl(): string {
  const rawUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL")

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL must be a valid URL, for example https://<project-ref>.supabase.co",
    )
  }

  const normalizedPath = parsed.pathname.replace(/\/+$/, "")
  if (normalizedPath === "" || normalizedPath === "/") {
    return parsed.origin
  }

  // Common misconfiguration: copying the REST endpoint instead of project URL.
  if (normalizedPath === "/rest/v1") {
    return parsed.origin
  }

  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL must not include a path. Use only the project URL (https://<project-ref>.supabase.co).",
  )
}

export function getSupabaseAnonKey(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const fallbackSiteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

  const rawUrl = siteUrl || fallbackSiteUrl

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a valid absolute URL, for example https://your-domain.com",
    )
  }

  return parsed.origin
}
