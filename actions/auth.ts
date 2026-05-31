"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSiteUrl } from "@/lib/supabase/env"
import { createClient } from "@/lib/supabase/server"
import { isSubscriptionPlanId, subscriptionPlansById } from "@/lib/subscription-plans"

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
    return { error: "Email y contrasena son obligatorios." }
  }

  if (password.length < 6) {
    return { error: "La contrasena debe tener al menos 6 caracteres." }
  }

  const supabase = await createClient()
  const callbackUrl = new URL("/auth/callback", getSiteUrl())
  callbackUrl.searchParams.set("next", "/dashboard")

  const { data, error } = await supabase.auth.signUp({
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

  if (data.session) {
    revalidatePath("/", "layout")
    redirect("/dashboard")
  }

  return {
    success:
      "Cuenta creada. Revisa tu email para confirmar el registro si tienes la confirmacion activada en Supabase.",
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
    return { error: "Email y contrasena son obligatorios." }
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

export async function activateSubscription(formData: FormData) {
  const selectedPlan = String(formData.get("plan") ?? "").trim()

  if (!isSubscriptionPlanId(selectedPlan)) {
    redirect("/dashboard?error=plan")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/dashboard")
  }

  const plan = subscriptionPlansById[selectedPlan]
  const { error } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      subscription_status: "active",
      subscription_plan: plan.id,
      subscription_name: plan.name,
      subscription_monthly_price: plan.priceMonthly,
      subscription_currency: "EUR",
      subscription_interval: "month",
      subscription_updated_at: new Date().toISOString(),
    },
  })

  if (error) {
    redirect("/dashboard?error=payment")
  }

  revalidatePath("/", "layout")
  revalidatePath("/dashboard")
  redirect("/dashboard?subscribed=1")
}
