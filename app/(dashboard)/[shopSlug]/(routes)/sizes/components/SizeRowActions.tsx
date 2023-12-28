"use client"

import type { Row } from "@tanstack/react-table"

import { Tables } from "@/types/supabase"
import { ApiRowActionsConfig, useApiRowActions } from "@/components/api/hooks/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface SizeRowActionsProps<TData> {
  row: Row<TData>
}

export function SizeRowActions<TData>({ row }: SizeRowActionsProps<TData>) {
  const size = row.original as Tables<"sizes">

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "sizes",
    itemId: size.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Size ID copied to the clipboard.",
      deleteSuccess: "Size was successfully deleted.",
      deleteError: "Make sure you have removed all products using this size first.",
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
