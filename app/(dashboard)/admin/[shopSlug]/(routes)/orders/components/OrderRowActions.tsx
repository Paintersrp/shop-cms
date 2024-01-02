"use client"

import { Row } from "@tanstack/react-table"

import { Tables } from "@/types/supabase"
import { ApiRowActionsConfig, useApiRowActions } from "@/hooks/admin/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface OrderRowActionsProps<TData> {
  row: Row<TData>
}

export function OrderRowActions<TData>({ row }: OrderRowActionsProps<TData>) {
  const order = row.original as Tables<"orders">

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "orders",
    itemId: order.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Order ID copied to the clipboard.",
      deleteSuccess: "Order was successfully deleted.",
      deleteError: "",
    },
    allowEdit: false,
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
