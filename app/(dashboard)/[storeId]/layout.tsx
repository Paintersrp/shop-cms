import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { useSessionStore } from "@/lib/stores/session"
import { getServerClient } from "@/lib/supabase/hook"

interface ShopLayoutProps {
  children: ReactNode
  params: { storeId: string }
}

async function ShopLayout({ children, params }: ShopLayoutProps) {
  const { storeId } = params
  const sb = getServerClient()
  const { data } = await sb.auth.getSession()
  const userId = data.session?.user.id

  // 1 hour 50 minutes

  console.log(userId)

  if (!userId) {
    redirect("/sign-in")
  }

  const { data: shop } = await sb
    .from("shops")
    .select()
    .eq("id", storeId)
    .eq("userId", userId)
    .single()

  if (!shop) {
    redirect("/")
  }

  return (
    <>
      <div>Navigation</div>
    </>
  )
}

export default ShopLayout
