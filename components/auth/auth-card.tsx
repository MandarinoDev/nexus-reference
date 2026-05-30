import Link from "next/link"
import type { ReactNode } from "react"

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <span className="text-zinc-950 font-bold">A</span>
          </div>
          <span className="font-semibold text-white text-lg">Apex</span>
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-8">
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-zinc-400 text-sm mb-6">{description}</p>
          {children}
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">{footer}</p>
      </div>
    </div>
  )
}
