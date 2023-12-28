import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"
import { Client } from "@/components/api/components/Client"

import { CategoryColumn, CategoryColumns } from "./components/CategoryColumns"

const CategoriesPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: categories } = await sb
    .from("categories")
    .select(`*, billboards ( id, label )`)
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedCategories: CategoryColumn[] = categories!.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboards!.label,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <Client
          data={formattedCategories}
          columns={CategoryColumns}
          filterKey="name"
          entityName="categories"
          entityIdName="categoryId"
        />
      </div>
    </div>
  )
}

export default CategoriesPage
