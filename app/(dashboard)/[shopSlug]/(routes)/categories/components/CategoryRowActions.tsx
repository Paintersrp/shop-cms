"use client"

import type { Row } from "@tanstack/react-table"

import { Tables } from "@/types/supabase"
import { useApiRowActions, type ApiRowActionsConfig } from "@/components/api/hooks/useApiRowActions"
import { ControlledConfirmationModal } from "@/components/modals/ControlledConfirmationModal"

interface CategoryRowActionsProps<TData> {
  row: Row<TData>
}

export function CategoryRowActions<TData>({ row }: CategoryRowActionsProps<TData>) {
  const category = row.original as Tables<"categories">

  const rowActionsConfig: ApiRowActionsConfig = {
    apiPath: "categories",
    itemId: category.id,
    paramNames: {
      slug: "shopSlug",
    },
    toasts: {
      copySuccess: "Category ID copied to the clipboard.",
      deleteSuccess: "Category was successfully deleted.",
      deleteError: "Make sure you have removed all products using this category first.",
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
