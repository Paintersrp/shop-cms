import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"

export default async function SetupLayout({ children }: { children: ReactNode }) {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  if (!data.user) {
    redirect("/sign-in")
  }

  const { data: store } = await sb
    .from("shops")
    .select()
    .match({ userId: data.user.id })
    .limit(1)
    .single()

  if (store) {
    redirect(`/${store.slug}`)
  }

  return <>{children}</>
}
