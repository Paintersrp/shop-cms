import "@/styles/globals.css"
import type { Metadata } from "next"

import { adminSiteConfig } from "@/config/admin"
import { fontSans } from "@/lib/fonts"
import { getServerClient } from "@/lib/supabase/hook"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers/Providers"

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

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <div className="flex min-h-screen flex-col">
          <Providers attribute="class" defaultTheme="system" enableSystem user={data.user}>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
