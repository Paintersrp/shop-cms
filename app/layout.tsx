import "@/styles/globals.css"
import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { getServerClient } from "@/lib/supabase/hook"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/header/Header"
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
  const sb = getServerClient()
  const { data } = await sb.auth.getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <div className="flex min-h-screen flex-col">
          <Providers attribute="class" defaultTheme="system" enableSystem user={data.user}>
            {/* <Header /> */}
            {/* <div className="flex-1 h-full">{children}</div> */}
            {/* <Footer /> */}
            
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
