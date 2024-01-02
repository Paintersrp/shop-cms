import { ReactNode } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { adminSiteConfig } from "@/config/admin"
import { getServerClient } from "@/lib/supabase/hook"

export const metadata: Metadata = {
  title: {
    default: adminSiteConfig.name,
    template: `%s - ${adminSiteConfig.name}`,
  },
  description: adminSiteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
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
    redirect(`/admin/${store.slug}`)
  }

  return <>{children}</>
}
