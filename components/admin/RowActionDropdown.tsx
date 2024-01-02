"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/ui/Icons"

interface RowActionDropdownProps {
  onOpen: () => void
  onCopy: () => void
  editPath: string | undefined
}

const RowActionDropdown: FC<RowActionDropdownProps> = ({ onOpen, onCopy, editPath }) => {
  const router = useRouter()

  console.log(editPath)

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

        <DropdownMenuItem onClick={onCopy}>
          <Icons.Copy className="mr-2 h-4 w-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>

        {editPath && (
          <DropdownMenuItem onClick={() => router.push(editPath)}>
            <Icons.Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={onOpen}>
          <Icons.Delete className="mr-2 h-4 w-4" />
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { RowActionDropdown }
