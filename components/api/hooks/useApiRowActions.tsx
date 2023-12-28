import { FC, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

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
import { Icons } from "@/components/Icons"

import { RowActionDropdown } from "../components/RowActionDropdown"

interface ApiRowActionsConfig {
  apiPath: string
  itemId: number

  paramNames: {
    slug: string
  }

  toasts?: {
    copySuccess: string
    deleteSuccess: string
    deleteError: string
  }
}

const useApiRowActions = ({
  apiPath,
  itemId,
  paramNames,
  toasts = {
    copySuccess: "ID copied to the clipboard.",
    deleteSuccess: "Item was successfully deleted.",
    deleteError: "Something went wrong. Please try again.",
  },
}: ApiRowActionsConfig) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const routeParams = useParams()

  const params = {
    slug: routeParams[paramNames.slug] || "",
  }

  const onCopy = () => {
    navigator.clipboard.writeText(String(itemId))
    toast.success(toasts.copySuccess)
  }

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${params.slug}/${apiPath}/${itemId}`)

      router.refresh()

      toast.success(toasts.deleteSuccess)
    } catch (error) {
      toast.error(toasts.deleteError)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const ActionDropdown: FC = () => {
    return (
      <RowActionDropdown
        onCopy={onCopy}
        onOpen={onOpen}
        editPath={`/${params.slug}/${apiPath}/${itemId}`}
      />
    )
  }

  return { open, isLoading, onOpen, onClose, onDelete, ActionDropdown }
}

export { type ApiRowActionsConfig, useApiRowActions }
