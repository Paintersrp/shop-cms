"use client"

import { type FC } from "react"

import type { Tables } from "@/types/supabase"
import { ColorSchema, type ColorRequest } from "@/lib/validation/color-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { ApiForm } from "@/components/api/components/ApiForm"
import { useApiForm, type ApiFormConfig } from "@/components/api/hooks/useApiForm"

interface ColorFormProps {
  initialData: Tables<"colors"> | null
}

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const apiFormConfig: ApiFormConfig<ColorRequest> = {
    initialData,
    schema: ColorSchema,
    apiPath: "colors",
    paramNames: {
      id: "colorId",
      slug: "shopSlug",
    },
    toasts: {
      submitSuccess: initialData ? "Color updated." : "Color created.",
      submitError: "Something went wrong.",
      deleteSuccess: "Color was successfully deleted.",
      deleteError: "Make sure you have removed all products using this color first.",
    },
  }

  const { form, isLoading, onSubmit, onDelete } = useApiForm<ColorRequest>(apiFormConfig)

  const title = initialData ? "Edit color" : "Create color"
  const description = initialData ? "Edit a color" : "Add a new color"
  const action = initialData ? "Save changes" : "Create"

  return (
    <ApiForm<ColorRequest>
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
              <Input disabled={isLoading} placeholder="Color name" {...field} />
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
              <div className="flex items-center gap-x-4">
                <Input disabled={isLoading} placeholder="Color value" {...field} />
                {field.value && (
                  <div className="border p-4 rounded" style={{ background: field.value }} />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </ApiForm>
  )
}

export { ColorForm }
