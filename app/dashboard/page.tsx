import Link from "next/link"
import { Check } from "lucide-react"
import { redirect } from "next/navigation"
import { activateSubscription, signOut } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { isSubscriptionPlanId, subscriptionPlans, subscriptionPlansById } from "@/lib/subscription-plans"

type DashboardPageProps = {
  searchParams: Promise<{ subscribed?: string; error?: string }>
}

function getSubscriptionErrorMessage(error?: string) {
  switch (error) {
    case "plan":
      return "El plan seleccionado no es valido."
    case "payment":
      return "No se pudo activar la suscripcion. Intentalo de nuevo."
    default:
      return null
  }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const fullName = user.user_metadata?.full_name as string | undefined
  const rawPlan = user.user_metadata?.subscription_plan
  const activePlan =
    user.user_metadata?.subscription_status === "active" &&
    typeof rawPlan === "string" &&
    isSubscriptionPlanId(rawPlan)
      ? subscriptionPlansById[rawPlan]
      : null
  const hasActiveSubscription = Boolean(activePlan)
  const subscriptionError = getSubscriptionErrorMessage(params.error)

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8">
            <p className="text-sm text-emerald-400 mb-2">Sesion activa</p>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenido{fullName ? `, ${fullName}` : ""}
            </h1>
            <p className="text-zinc-400 mb-6">{user.email}</p>
            <p className="text-zinc-300 max-w-2xl">
              Para usar el analisis de negocio y contratos de LexSimple necesitas activar una suscripcion de pago.
              Elige un plan para entrar a tu dashboard completo.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild variant="outline" className="border-zinc-700 text-zinc-300">
                <Link href="/">Volver al inicio</Link>
              </Button>
              <form action={signOut}>
                <Button
                  type="submit"
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:text-white"
                >
                  Cerrar sesion
                </Button>
              </form>
            </div>
          </div>

          {subscriptionError && (
            <div className="rounded-2xl border border-red-900/50 bg-red-950/30 px-5 py-4 text-sm text-red-300">
              {subscriptionError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-zinc-700 bg-zinc-900"
                    : "border-zinc-800 bg-zinc-900/70"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-950">
                    Mas recomendado
                  </span>
                )}

                <h2 className="text-xl font-semibold text-white mb-2">{plan.name}</h2>
                <p className="text-sm text-zinc-400 mb-5">{plan.description}</p>

                <div className="mb-5">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">{plan.priceLabel}</span>
                    <span className="text-zinc-400 text-sm mb-1">/mes</span>
                  </div>
                  <p className="text-sm text-emerald-400 mt-2">{plan.aiResponses}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" strokeWidth={1.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <form action={activateSubscription}>
                  <input type="hidden" name="plan" value={plan.id} />
                  <Button
                    type="submit"
                    className={`w-full rounded-full ${
                      plan.highlighted
                        ? "shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200"
                        : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                    }`}
                  >
                    Pagar {plan.priceLabel}/mes
                  </Button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8">
          <p className="text-sm text-emerald-400 mb-2">Sesion activa</p>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hola{fullName ? `, ${fullName}` : ""}
          </h1>
          <p className="text-zinc-400 mb-6">{user.email}</p>

          {params.subscribed === "1" && (
            <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-4 mb-6 text-sm text-emerald-300">
              Suscripcion activada correctamente. Ya puedes usar todo tu dashboard.
            </div>
          )}

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 mb-6 text-sm text-zinc-400">
            <p className="mb-1">Plan activo: {activePlan?.name}</p>
            <p className="mb-1">Precio: {activePlan?.priceLabel}/mes</p>
            <p className="text-emerald-400">{activePlan?.aiResponses}</p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 mb-8 text-sm text-zinc-400">
            <p className="mb-2">Tu cuenta esta conectada con Supabase Auth.</p>
            <p className="font-mono text-xs text-zinc-500 break-all">ID: {user.id}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-zinc-700 text-zinc-300">
              <Link href="/">Volver al inicio</Link>
            </Button>
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white"
              >
                Cerrar sesion
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
