"use client"

import Link from "next/link"
import { useActionState } from "react"
import { signIn, type AuthState } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthCard } from "@/components/auth/auth-card"

const initialState: AuthState = {}

type LoginFormProps = {
  redirect?: string
  error?: string
}

export function LoginForm({ redirect = "/dashboard", error }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signIn, initialState)

  return (
    <AuthCard
      title="Iniciar sesion"
      description="Accede a tu cuenta de LexSimple"
      footer={
        <>
          No tienes cuenta?{" "}
          <Link href="/register" className="text-white hover:underline">
            Registrate
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirect" value={redirect} />

        {(error || state.error) && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {error === "auth_callback"
              ? "No se pudo completar la autenticacion. Intentalo de nuevo."
              : (state.error ?? error)}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            autoComplete="email"
            className="bg-zinc-950 border-zinc-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-zinc-300">
            Contrasena
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            autoComplete="current-password"
            className="bg-zinc-950 border-zinc-700 text-white"
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full h-11"
        >
          {pending ? "Entrando..." : "Iniciar sesion"}
        </Button>
      </form>
    </AuthCard>
  )
}
