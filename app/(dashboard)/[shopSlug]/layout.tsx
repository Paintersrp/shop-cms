import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { Header } from "@/components/header/Header"

interface ShopLayoutProps {
  children: ReactNode
  params: { shopSlug: string }
}

async function ShopLayout({ children, params }: ShopLayoutProps) {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()
  const { shopSlug } = params

  if (!data.user) {
    redirect("/sign-in")
  }

  const { data: shop } = await sb
    .from("shops")
    .select()
    .eq("slug", shopSlug)
    .eq("userId", data.user.id)
    .single()

  if (!shop) {
    redirect("/")
  }

  return (
    <>
      <Header />
      <section className="px-6 sm:px-4 sm:container sm:py-4">{children}</section>
    </>
  )
}

export default ShopLayout
