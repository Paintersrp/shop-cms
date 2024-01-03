"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/tables/DataTableColumnHeader"

import { CategoryRowActions } from "./CategoryRowActions"

export type CategoryColumn = {
  id: number
  name: string
  billboardLabel: string
  created_at: string
}

export const CategoryColumns: ColumnDef<CategoryColumn>[] = [
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
    cell: ({ row }) => <div className="w-[10px]">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="sm:w-[150px] md:w-[250px] lg:w-[400px] xl:w-[500px] truncate font-medium">
          {row.getValue("name")}
        </div>
      )
    },
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Billboard" />,
    cell: ({ row }) => {
      return <div className="truncate font-medium">{row.getValue("billboardLabel")}</div>
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryRowActions row={row} />,
  },
]
