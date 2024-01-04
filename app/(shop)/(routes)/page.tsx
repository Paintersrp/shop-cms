import type { FC } from "react"
import getBillboard from "@/actions/billboard"
import getProducts from "@/actions/products"

import { Billboard } from "@/components/shop/Billboard"
import { Container } from "@/components/shop/Container"
import { ProductList } from "@/components/shop/ProductList"

export const revalidate = 0

const ShopPage: FC = async () => {
  const billboard = await getBillboard("12")
  const products = await getProducts({ isFeatured: true })

  return (
    <Container>
      <div className="space-y-10 pb-10">{billboard && <Billboard data={billboard} />}</div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products!} />
      </div>
    </Container>
  )
}

export default ShopPage
