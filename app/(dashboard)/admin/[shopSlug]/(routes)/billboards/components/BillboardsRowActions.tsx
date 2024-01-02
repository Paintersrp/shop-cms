"use client"

import { Row } from "@tanstack/react-table"

import { Tables } from "@/types/supabase"
import { ApiRowActionsConfig, useApiRowActions } from "@/hooks/admin/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface BillboardRowActionsProps<TData> {
  row: Row<TData>
}

export function BillboardRowActions<TData>({ row }: BillboardRowActionsProps<TData>) {
  const billboard = row.original as Tables<"billboards">

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "billboards",
    itemId: billboard.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Billboard ID copied to the clipboard.",
      deleteSuccess: "Billboard was successfully deleted.",
      deleteError: "Make sure you have removed all categories using this billboard first.",
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
