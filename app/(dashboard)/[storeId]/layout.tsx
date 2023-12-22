import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"

interface ShopLayoutProps {
  children: ReactNode
  params: { storeId: string }
}

async function ShopLayout({ children, params }: ShopLayoutProps) {
  const { storeId } = params
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  // 1 hour 50 minutes

  if (!data.user) {
    redirect("/sign-in")
  }

  const { data: shop } = await sb
    .from("shops")
    .select()
    .eq("id", storeId)
    .eq("userId", data.user.id)
    .single()

  if (!shop) {
    redirect("/")
  }

  return (
    <>
      <div>Navigation</div>
      {children}
    </>
  )
}

export default ShopLayout
