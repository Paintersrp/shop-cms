import { getServerClient } from "@/lib/supabase/hook"

import { CategoryForm } from "../components/CategoryForm"

interface CategoryPageProps {
  params: {
    categoryId: string
    shopSlug: string
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const sb = getServerClient()

  const { categoryId, shopSlug } = params

  const { data: category } = await sb.from("categories").select().eq("id", categoryId).single()
  const { data: billboards } = await sb.from("billboards").select().eq("shop_slug", shopSlug)

  // todo if billboard not found display ?

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <CategoryForm initialData={category!} billboards={billboards!} />
      </div>
    </div>
  )
}

export default CategoryPage
