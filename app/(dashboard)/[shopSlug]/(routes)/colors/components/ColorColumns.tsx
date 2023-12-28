"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/Checkbox"
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader"

import { ColorRowActions } from "./ColorRowActions"

export type ColorColumn = {
  id: number
  name: string
  value: string
  created_at: string
}

export const ColorColumns: ColumnDef<ColorColumn>[] = [
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
    accessorKey: "value",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
    cell: ({ row }) => {
      return (
        <div className="font-medium flex items-center gap-x-2 ">
          <div className="h-6 w-6 border" style={{ background: row.original.value }} />
          {row.getValue("value")}
        </div>
      )
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ColorRowActions row={row} />,
  },
]
