export const subscriptionPlans = [
  {
    id: "growth",
    name: "LexSimple Growth",
    description: "Para pymes que quieren validar contratos y decisiones de negocio con IA.",
    priceMonthly: 9.99,
    priceLabel: "9,99 EUR",
    aiResponses: "Hasta 400 respuestas IA al mes para tu negocio.",
    features: [
      "Analisis de hasta 20 contratos al mes",
      "Checklist de objetivos y desviaciones clave",
      "Alertas basicas de riesgos contractuales",
      "1 equipo de trabajo",
      "Soporte por email",
    ],
    highlighted: false,
  },
  {
    id: "scale",
    name: "LexSimple Scale",
    description: "Para empresas que necesitan mayor volumen, control y seguimiento continuo.",
    priceMonthly: 29.99,
    priceLabel: "29,99 EUR",
    aiResponses: "Hasta 2.500 respuestas IA al mes para operaciones y legal.",
    features: [
      "Analisis avanzado de contratos sin limite practico",
      "Priorizacion de clausulas criticas y riesgos",
      "Panel de objetivos por area y seguimiento mensual",
      "Hasta 5 equipos de trabajo",
      "Soporte prioritario",
    ],
    highlighted: true,
  },
] as const

export type SubscriptionPlan = (typeof subscriptionPlans)[number]
export type SubscriptionPlanId = SubscriptionPlan["id"]

export const subscriptionPlansById: Record<SubscriptionPlanId, SubscriptionPlan> = {
  growth: subscriptionPlans[0],
  scale: subscriptionPlans[1],
}

export function isSubscriptionPlanId(value: string): value is SubscriptionPlanId {
  return value in subscriptionPlansById
}
