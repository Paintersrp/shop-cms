import type { FC } from "react"
import { notFound } from "next/navigation"
import getProduct from "@/actions/product"
import getProducts from "@/actions/products"

import { Separator } from "@/components/ui/Separator"
import { Container } from "@/components/shop/Container"
import { Gallery } from "@/components/shop/Gallery"
import { Info } from "@/components/shop/Info"
import { ProductList } from "@/components/shop/ProductList"

interface ProductPageProps {
  params: { productId: number }
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params

  const product = await getProduct(productId)

  if (!product) return notFound()

  const suggestedProducts = await getProducts({
    categoryId: product?.category.id,
  })

  const filteredSuggestedProducts = suggestedProducts?.filter(
    (item) => item.id !== Number(productId)
  )

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product.images} />

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info data={product} />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <ProductList title="Related Items" items={filteredSuggestedProducts ?? []} />
    </Container>
  )
}

export default ProductPage
