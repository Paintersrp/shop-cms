import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"
import { Client } from "@/components/api/components/Client"

import { ColorColumn, ColorColumns } from "./components/ColorColumns"

const ColorsPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: colors } = await sb
    .from("colors")
    .select()
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedColors: ColorColumn[] = colors!.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <Client
          data={formattedColors}
          columns={ColorColumns}
          filterKey="name"
          entityName="colors"
          entityIdName="colorId"
        />
      </div>
    </div>
  )
}

export default ColorsPage
