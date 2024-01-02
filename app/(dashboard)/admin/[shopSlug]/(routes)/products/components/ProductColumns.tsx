"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader"

import { ProductRowActions } from "./ProductRowActions"

type ProductColumn = {
  id: number
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  created_at: string
}

const ProductColumns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium">{row.getValue("name")}</div>
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("price")}</div>
    },
  },

  {
    accessorKey: "isArchived",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Archived" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("isArchived") ? "True" : "False"}</div>
    },
  },

  {
    accessorKey: "isFeatured",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Featured" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("isFeatured") ? "True" : "False"}</div>
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("category")}</div>
    },
  },

  {
    accessorKey: "size",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Size" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("size")}</div>
    },
  },

  {
    accessorKey: "color",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Color" />,
    cell: ({ row }) => {
      return (
        <div className="font-medium flex items-center gap-x-2 ">
          <div className="h-6 w-6 border" style={{ background: row.getValue("color") }} />
          {row.getValue("color")}
        </div>
      )
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Creation Date" />,
    cell: ({ row }) => {
      return <div className="font-medium truncate">{row.getValue("created_at")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductRowActions row={row} />,
  },
]

export { type ProductColumn, ProductColumns }
