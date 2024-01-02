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
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 relative flex items-center">
          <Link href="/" className="flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">{shopSiteConfig.name}</p>
          </Link>
          <ShopMainNav data={categories} />
          <ShopNavbarActions />
        </div>
      </Container>
    </div>
  )
}

export { ShopNavbar }
