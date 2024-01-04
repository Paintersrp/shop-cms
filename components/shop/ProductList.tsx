import type { FC } from "react"
import type { ProductRecord } from "@/actions/products"

import { NoResults } from "@/components/shop/NoResults"
import { ProductCard } from "@/components/shop/ProductCard"

interface ProductListProps {
  title: string
  items: ProductRecord[]
}

const ProductList: FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      {items.length === 0 && <NoResults />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export { ProductList }
