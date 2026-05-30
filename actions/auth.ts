"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/supabase/env"

export type AuthState = {
  error?: string
  success?: string
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("fullName") ?? "").trim()

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." }
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." }
  }

  const supabase = await createClient()
  const callbackUrl = new URL("/auth/callback", getSiteUrl())
  callbackUrl.searchParams.set("next", "/dashboard")

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      data: {
        full_name: fullName || null,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return {
    success:
      "Cuenta creada. Revisa tu email para confirmar el registro (si está activada la confirmación en Supabase).",
  }
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const redirectTo = String(formData.get("redirect") ?? "/dashboard")

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect(redirectTo)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}
