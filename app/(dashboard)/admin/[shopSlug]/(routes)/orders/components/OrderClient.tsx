"use client"

import type { FC } from "react"

import { Separator } from "@/components/ui/Separator"
import { DataTable } from "@/components/ui/tables/DataTable"
import { Heading } from "@/components/admin/Heading"

import { OrderColumn, OrderColumns } from "./OrderColumns"

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your shop" />

      <Separator />
      <DataTable filterKey="products" columns={OrderColumns} data={data} />
    </>
  )
}

export { OrderClient }
