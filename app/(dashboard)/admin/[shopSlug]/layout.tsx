import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"
import { AdminFooter } from "@/components/admin/AdminFooter"
import { AdminHeader } from "@/components/admin/AdminHeader"

interface DashboardLayoutProps {
  children: ReactNode
  params: { shopSlug: string }
}

async function DashboardLayout({ children, params }: DashboardLayoutProps) {
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
      <AdminHeader />
      <section className="px-6 sm:px-4 sm:container sm:py-4 min-h-[85vh]">{children}</section>
      <AdminFooter />
    </>
  )
}

export default DashboardLayout
