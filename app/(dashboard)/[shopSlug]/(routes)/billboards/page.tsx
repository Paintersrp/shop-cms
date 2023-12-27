import { format } from "date-fns"

import { getServerClient } from "@/lib/supabase/hook"

import { BillboardClient } from "./components/BillboardClient"
import { BillboardColumn } from "./components/BillboardsColumns"

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
        <BillboardClient data={formattedBillboards ?? []} />
      </div>
    </div>
  )
}

export default BillboardsPage
