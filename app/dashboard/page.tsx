import Link from "next/link"
import { redirect } from "next/navigation"
import { signOut } from "@/actions/auth"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const fullName = user.user_metadata?.full_name as string | undefined

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8">
          <p className="text-sm text-emerald-400 mb-2">Sesión activa</p>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hola{fullName ? `, ${fullName}` : ""}
          </h1>
          <p className="text-zinc-400 mb-6">{user.email}</p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 mb-8 text-sm text-zinc-400">
            <p className="mb-2">Tu cuenta está conectada con Supabase Auth.</p>
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
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
