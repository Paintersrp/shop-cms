"use client"

import { type FC } from "react"

import type { Tables } from "@/types/supabase"
import { SizeSchema, type SizeRequest } from "@/lib/validation/size-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { ApiForm } from "@/components/api/components/ApiForm"
import { useApiForm, type ApiFormConfig } from "@/components/api/hooks/useApiForm"

interface SizeFormProps {
  initialData: Tables<"sizes"> | null
}

const SizeForm: FC<SizeFormProps> = ({ initialData }) => {
  const apiFormConfig: ApiFormConfig<SizeRequest> = {
    existingData: !!initialData,
    initialData,
    schema: SizeSchema,
    apiPath: "sizes",
    paramNames: {
      id: "sizeId",
      slug: "shopSlug",
    },
    toasts: {
      submitSuccess: initialData ? "Size updated." : "Size created.",
      submitError: "Something went wrong.",
      deleteSuccess: "Size was successfully deleted.",
      deleteError: "Make sure you have removed all products using this size first.",
    },
  }

  const { form, isLoading, onSubmit, onDelete } = useApiForm<SizeRequest>(apiFormConfig)

  const title = initialData ? "Edit size" : "Create size"
  const description = initialData ? "Edit a size" : "Add a new size"
  const action = initialData ? "Save changes" : "Create"

  return (
    <ApiForm<SizeRequest>
      form={form}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onDelete={onDelete}
      title={title}
      description={description}
      action={action}
      hasData={!!initialData}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input disabled={isLoading} placeholder="Size name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Value</FormLabel>
            <FormControl>
              <Input disabled={isLoading} placeholder="Size value" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </ApiForm>
  )
}

export { SizeForm }
