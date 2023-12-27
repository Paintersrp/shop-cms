"use client"

import { useParams, useRouter } from "next/navigation"
import { Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { BillboardColumnSchema } from "@/lib/validation/billboard-column"
import { Button } from "@/components/ui/Buttonn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/Iconss"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const { shopSlug } = useParams()

  const billboard = BillboardColumnSchema.parse(row.original)

  const onCopy = (id: number) => {
    navigator.clipboard.writeText(String(id))
    toast.success("ID copied to the clipboard.")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Menu Trigger */}
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Icons.MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onCopy(billboard.id)}>
          <Icons.Copy className="mr-2 h-4 w-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(`/${shopSlug}/billboards/${billboard.id}`)}>
          <Icons.Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Icons.Delete className="mr-2 h-4 w-4" />
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
