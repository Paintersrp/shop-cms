import type { FC } from "react"
import Link from "next/link"
import getCategories from "@/actions/categories"

import { shopSiteConfig } from "@/config/shop"
import { Container } from "@/components/shop/Container"

import { ShopNavbarActions } from "./ShopNavbarActions"
import { ShopMainNav } from "./ShopMainNav"

export const revalidate = 0

const ShopNavbar: FC = async () => {
  const categories = await getCategories()

  return (
    <header className="border-b">
      <Container>
        <div className="relative flex items-center">
          <Link href="/" className="flex flex-shrink-0 lg:ml-0 gap-x-2 py-2">
            <p className="font-bold text-lg">{shopSiteConfig.name}</p>
          </Link>
          <ShopMainNav data={categories} />
          <ShopNavbarActions />
        </div>
      </Container>
    </header>
  )
}

export { ShopNavbar }
