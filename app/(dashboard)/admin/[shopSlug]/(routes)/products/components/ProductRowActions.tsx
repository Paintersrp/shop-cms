"use client"

import { Row } from "@tanstack/react-table"

import { Tables } from "@/types/supabase"
import { ApiRowActionsConfig, useApiRowActions } from "@/hooks/admin/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface ProductRowActionsProps<TData> {
  row: Row<TData>
}

export function ProductRowActions<TData>({ row }: ProductRowActionsProps<TData>) {
  const product = row.original as any

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "products",
    itemId: product.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Product ID copied to the clipboard.",
      deleteSuccess: "Product was successfully deleted.",
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
