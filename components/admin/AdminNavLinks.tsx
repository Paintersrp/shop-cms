"use client"

import { useState, type FC } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { Tables } from "@/types/supabase"
import { buttonVariants } from "@/components/ui/Button"
import { ShopSwitcher } from "@/components/admin/ShopSwitcher"

import { AnimatedNav } from "../ui/animated/AnimatedNav"
import { useAnimatedNav } from "../ui/animated/hooks/useAnimatedNav"

interface AdminNavLinksProps {
  shops?: Tables<"shops">[]
}

const AdminNavLinks: FC<AdminNavLinksProps> = ({ shops }) => {
  const pathname = usePathname()
  const { shopSlug } = useParams()

  const navItems = [
    { id: "Overview", href: `/admin/${shopSlug}`, title: "Overview" },
    { id: "Billboards", href: `/admin/${shopSlug}/billboards`, title: "Billboards" },
    { id: "Categories", href: `/admin/${shopSlug}/categories`, title: "Categories" },
    { id: "Sizes", href: `/admin/${shopSlug}/sizes`, title: "Sizes" },
    { id: "Colors", href: `/admin/${shopSlug}/colors`, title: "Colors" },
    { id: "Products", href: `/admin/${shopSlug}/products`, title: "Products" },
    { id: "Orders", href: `/admin/${shopSlug}/orders`, title: "Orders" },
    { id: "Settings", href: `/admin/${shopSlug}/settings`, title: "Settings" },
  ]
  // const routes = [
  //   {
  //     href: `/admin/${shopSlug}`,
  //     title: "Overview",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/billboards`,
  //     title: "Billboards",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/categories`,
  //     title: "Categories",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/sizes`,
  //     title: "Sizes",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/colors`,
  //     title: "Colors",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/products`,
  //     title: "Products",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/orders`,
  //     title: "Orders",
  //   },
  //   {
  //     href: `/admin/${shopSlug}/settings`,
  //     title: "Settings",
  //   },
  // ]

  const [navProps] = useState({
    navItems,
    initialItemId: undefined,
  })

  const { itemProps } = useAnimatedNav(navProps)

  return (
    <div className="flex items-center">
      <ShopSwitcher items={shops} />
      <AnimatedNav {...itemProps} />
      {/* <nav className="flex items-center"> */}
      {/* {routes.map((link) => {
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
        })} */}
      {/* </nav> */}
    </div>
  )
}

export { AdminNavLinks }
