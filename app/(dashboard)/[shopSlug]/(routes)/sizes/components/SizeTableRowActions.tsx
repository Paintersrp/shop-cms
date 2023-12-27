"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Row } from "@tanstack/react-table"
import axios from "axios"
import { toast } from "sonner"

import { SizeColumnSchema } from "@/lib/validation/size-column"
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
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface SizeTableRowActionsProps<TData> {
  row: Row<TData>
}

export function SizeTableRowActions<TData>({ row }: SizeTableRowActionsProps<TData>) {
  const router = useRouter()
  const { shopSlug } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const size = SizeColumnSchema.parse(row.original)

  const onCopy = (id: number) => {
    navigator.clipboard.writeText(String(id))
    toast.success("ID copied to the clipboard.")
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${shopSlug}/sizes/${size.id}`)

      router.refresh()

      toast.success("Size was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all products using this size first.")
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <ControlledConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        isLoading={isLoading}
        onConfirm={onDelete}
      />
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

          <DropdownMenuItem onClick={() => onCopy(size.id)}>
            <Icons.Copy className="mr-2 h-4 w-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push(`/${shopSlug}/sizes/${size.id}`)}>
            <Icons.Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icons.Delete className="mr-2 h-4 w-4" />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
