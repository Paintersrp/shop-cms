"use client"

import type { FC } from "react"
import Link from "next/link"
import { redirect, useParams, usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { Tables } from "@/types/supabase"
import { siteConfig } from "@/config/site"
import { useUserStore } from "@/lib/stores/user"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"

import { ShopSwitcher } from "../ShopSwitcher"

interface NavLinksProps {
  shops?: Tables<"shops">[]
}

const NavLinks: FC<NavLinksProps> = ({ shops }) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeName}/settings`,
      title: "Settings",
    },
  ]

  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.ShoppingBag className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      <ShopSwitcher items={shops} className="ml-6 mr-3" />
      <nav className="flex items-center">
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
    </div>
  )
}

export { NavLinks }
