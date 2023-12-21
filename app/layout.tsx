import "@/styles/globals.css"
import { Metadata } from "next"
import { cookies } from "next/headers"
import type { Session } from "@supabase/gotrue-js/src/lib/types"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { useSessionStore } from "@/lib/stores/session"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/Header"
import { Providers } from "@/components/providers/Providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const session = await supabase.auth.getSession()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <div className="min-h-screen">
            <Providers
              attribute="class"
              defaultTheme="system"
              enableSystem
              session={session.data.session}
            >
              <SiteHeader />
              <div className="h-full">{children}</div>
            </Providers>
          </div>
        </body>
      </html>
    </>
  )
}
