import { redirect } from "next/navigation"
import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"
import { formatter } from "@/lib/utils"
import { Client } from "@/components/api/components/Client"

import { ProductColumns, type ProductColumn } from "./components/ProductColumns"

const ProductsPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: shop } = await sb.from("shops").select().eq("slug", params.shopSlug).single()

  if (!shop) redirect("/")

  const { data: products } = await sb
    .from(`${shop.type}_product`)
    .select(
      `*,
      categories (*),
      sizes (*),
      colors (*)`
    )
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedProducts: ProductColumn[] = products!.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.is_featured,
    isArchived: item.is_archived,
    price: formatter.format(item.price),
    category: item.categories.name,
    size: item.sizes.name,
    color: item.colors.value,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        {/* Entity name fix for product types */}
        <Client
          data={formattedProducts}
          columns={ProductColumns}
          filterKey="name"
          entityName="products"
          entityIdName="productId"
        />
      </div>
    </div>
  )
}

export default ProductsPage
