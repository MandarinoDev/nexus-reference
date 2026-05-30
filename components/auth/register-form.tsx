"use client"

import Link from "next/link"
import { useActionState } from "react"
import { signUp, type AuthState } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthCard } from "@/components/auth/auth-card"

const initialState: AuthState = {}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState)

  return (
    <AuthCard
      title="Crear cuenta"
      description="Regístrate gratis en Apex"
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-white hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-4">
        {state.error && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
            {state.success}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-zinc-300">
            Nombre completo
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
            className="bg-zinc-950 border-zinc-700 text-white"
          />
        </div>

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
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            required
            minLength={6}
            autoComplete="new-password"
            className="bg-zinc-950 border-zinc-700 text-white"
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full h-11"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>
    </AuthCard>
  )
}
