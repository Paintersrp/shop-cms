import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { Header } from "@/components/header/Header"

interface ShopLayoutProps {
  children: ReactNode
  params: { storeName: string }
}

async function ShopLayout({ children, params }: ShopLayoutProps) {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()
  const { storeName } = params

  if (!data.user) {
    redirect("/sign-in")
  }

  const { data: shop } = await sb
    .from("shops")
    .select()
    .eq("name", storeName)
    .eq("userId", data.user.id)
    .single()

  if (!shop) {
    redirect("/")
  }

  return (
    <>
      <Header />
      <section className="px-4 sm:px-2 sm:container sm:py-4">{children}</section>
    </>
  )
}

export default ShopLayout
