import type { FC } from "react"
import Link from "next/link"
import getCategories from "@/actions/categories"

import { shopSiteConfig } from "@/config/shop"
import { Container } from "@/components/shop/Container"

import { ShopMainNav } from "./ShopMainNav"
import { ShopNavbarActions } from "./ShopNavbarActions"

export const revalidate = 0

const ShopNavbar: FC = async () => {
  const categories = await getCategories()
  const { Icon, name } = shopSiteConfig

  return (
    <header className="border-b">
      <Container>
        <div className="relative flex items-center">
          <Link href="/" className="flex flex-shrink-0 lg:ml-0 gap-x-2 py-2 items-center">
            <Icon className="h-6 w-6" />
            <p className="font-bold text-lg">{name}</p>
          </Link>
          <ShopMainNav data={categories} />
          <ShopNavbarActions />
        </div>
      </Container>
    </header>
  )
}

export { ShopNavbar }
