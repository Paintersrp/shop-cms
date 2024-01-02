import type { ReactNode } from "react"
import { Metadata } from "next"

import { shopSiteConfig } from "@/config/shop"
import { ShopNavbar } from "@/components/headers/shop/ShopNavbar"
import { ShopFooter } from "@/components/footers/ShopFooter"

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
      {/* <section className="px-6 sm:px-4 sm:container sm:py-4">{children}</section> */}
      {children}
      <ShopFooter />
    </>
  )
}

export default ShopLayout
