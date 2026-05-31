import type { SubscriptionPlanId } from "@/lib/subscription-plans"

const envByPlan: Record<SubscriptionPlanId, string> = {
  growth: "PAYPAL_GROWTH_SUBSCRIPTION_URL",
  scale: "PAYPAL_SCALE_SUBSCRIPTION_URL",
}

function normalizeUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
}

export function getPayPalSubscriptionLink(planId: SubscriptionPlanId): string | null {
  const envName = envByPlan[planId]
  const raw = process.env[envName]
  if (!raw) {
    return null
  }

  return normalizeUrl(raw)
}
