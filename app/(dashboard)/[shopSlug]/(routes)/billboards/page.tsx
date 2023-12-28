import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"
import { Client } from "@/components/api/components/Client"

import { BillboardColumn, BillboardColumns } from "./components/BillboardsColumns"

const BillboardsPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: billboards } = await sb
    .from("billboards")
    .select()
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedBillboards: BillboardColumn[] = billboards!.map((item) => ({
    id: item.id,
    label: item.label,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <Client
          data={formattedBillboards}
          columns={BillboardColumns}
          filterKey="name"
          entityName="billboards"
          entityIdName="billboardId"
        />
      </div>
    </div>
  )
}

export default BillboardsPage
