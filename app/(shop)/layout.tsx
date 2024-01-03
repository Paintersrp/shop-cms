import type { ReactNode } from "react"
import { Metadata } from "next"

import { shopSiteConfig } from "@/config/shop"
import { ShopFooter } from "@/components/shop/ShopFooter"
import { ShopNavbar } from "@/components/shop/ShopNavbar"

export const metadata: Metadata = {
  title: {
    default: shopSiteConfig.name,
    template: `%s - ${shopSiteConfig.name}`,
  },
  description: shopSiteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/shop/favicon.ico",
    shortcut: "/shop/favicon-16x16.png",
    apple: "/shop/apple-touch-icon.png",
  },
}

interface ShopLayoutProps {
  children: ReactNode
}

async function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <ShopNavbar />
      <section className="min-h-[83.97vh]">{children}</section>
      <ShopFooter />
    </>
  )
}

export default ShopLayout
