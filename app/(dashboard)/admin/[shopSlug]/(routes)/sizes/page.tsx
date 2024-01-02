import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"
import { Client } from "@/components/admin/Client"

import { SizeColumn, SizeColumns } from "./components/SizeColumns"

const SizesPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: sizes } = await sb
    .from("sizes")
    .select()
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedSizes: SizeColumn[] = sizes!.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <Client
          data={formattedSizes}
          columns={SizeColumns}
          filterKey="name"
          entityName="sizes"
          entityIdName="sizeId"
        />
      </div>
    </div>
  )
}

export default SizesPage
