"use client"

import type { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tables } from "@/types/supabase"
import { shopSiteConfig } from "@/config/shop"
import { buttonVariants } from "@/components/ui/Button"

interface ShopMainNavProps {
  data: Tables<"categories">[]
}

const ShopMainNav: FC<ShopMainNavProps> = ({ data }) => {
  const pathname = usePathname()

  const routes = data.map((category) => ({
    href: `/category/${category.name}`,
    title: category.name,
  }))

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((link) => {
        const active = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={buttonVariants({
              size: "sm",
              variant: "link",
              className: active ? "underline-offset-4 underline items-center" : "",
            })}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}

export { ShopMainNav }
