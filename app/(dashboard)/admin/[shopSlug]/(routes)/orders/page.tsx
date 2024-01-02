import { format } from "date-fns"

import { Tables } from "@/types/supabase"
import { getServerClient } from "@/lib/supabase/hook"
import { formatter } from "@/lib/utils"
import { Client } from "@/components/admin/Client"

import { OrderClient } from "./components/OrderClient"
import { OrderColumn, OrderColumns } from "./components/OrderColumns"

const OrdersPage = async ({ params }: { params: { shopSlug: string } }) => {
  const sb = getServerClient()

  const { data: orders } = await sb
    .from("orders")
    .select(
      `*,
    order_items (*, 
      retail_product (*)
      )`
    )
    .eq("shop_slug", params.shopSlug)
    .order("created_at", { ascending: false })

  const formattedOrders: OrderColumn[] = orders!.map((item) => ({
    id: item.id,
    phone: item.phone ?? "",
    address: item.address ?? "",
    products: item.order_items.map((orderItem) => orderItem.retail_product?.name).join(", "),
    totalPrice: formatter.format(
      item.order_items.reduce((total, item) => {
        return total + Number(item.retail_product!.price)
      }, 0)
    ),
    isPaid: item.is_paid,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage
