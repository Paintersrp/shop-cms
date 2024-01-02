import { redirect } from "next/navigation"

import { getServerClient } from "@/lib/supabase/hook"

import { ProductForm } from "../components/ProductForm"

interface ProductPageProps {
  params: { productId: string; shopSlug: string }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const sb = getServerClient()
  const { productId, shopSlug } = params

  const { data: shop } = await sb.from("shops").select().eq("slug", shopSlug).single()

  if (!shop) redirect("/")

  const { data: product } = await sb
    .from(`${shop.type}_product`)
    .select(
      `*,
      categories (*),
      sizes (*),
      colors (*)`
    )
    .eq("id", productId)
    .single()

  if (product.images) {
    product.images = product.images.map((url: string) => ({ url }))
  }

  const { data: categories } = await sb.from("categories").select()
  const { data: sizes } = await sb.from("sizes").select()
  const { data: colors } = await sb.from("colors").select()

  // todo if billboard not found display ?

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ProductForm
          initialData={product!}
          categories={categories ?? []}
          sizes={sizes ?? []}
          colors={colors ?? []}
        />
      </div>
    </div>
  )
}

export default ProductPage
