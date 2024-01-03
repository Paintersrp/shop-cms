"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/tables/DataTableColumnHeader"

import { OrderRowActions } from "./OrderRowActions"

export type OrderColumn = {
  id: number
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  created_at: string
}

export const OrderColumns: ColumnDef<OrderColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Products" />,
    cell: ({ row }) => {
      return (
        <div className="sm:w-[100px] md:w-[150px] xl:w-[200px] truncate font-medium">
          {row.getValue("products")}
        </div>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium">{row.getValue("phone")}</div>
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium">{row.getValue("address")}</div>
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Price" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium">{row.getValue("totalPrice")}</div>
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paid" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("isPaid") ? "True" : "False"}</div>
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Creation Date" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <OrderRowActions row={row} />,
  // },
]
