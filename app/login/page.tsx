import { LoginForm } from "@/components/auth/login-form"

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return <LoginForm redirect={params.redirect ?? "/dashboard"} error={params.error} />
}
