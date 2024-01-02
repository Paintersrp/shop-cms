"use client"

import type { Row } from "@tanstack/react-table"

import type { Tables } from "@/types/supabase"
import { useApiRowActions, type ApiRowActionsConfig } from "@/hooks/admin/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface ColorRowActionsProps<TData> {
  row: Row<TData>
}

export function ColorRowActions<TData>({ row }: ColorRowActionsProps<TData>) {
  const color = row.original as Tables<"colors">

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "colors",
    itemId: color.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Color ID copied to the clipboard.",
      deleteSuccess: "Color was successfully deleted.",
      deleteError: "Make sure you have removed all products using this color first.",
    },
  }

  const { open, isLoading, onClose, onDelete, ActionDropdown } = useApiRowActions(rowActionsConfig)

  return (
    <>
      <ControlledConfirmationModal
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        onConfirm={onDelete}
      />

      {/* Render returned Action Dropdown */}
      <ActionDropdown />
    </>
  )
}
