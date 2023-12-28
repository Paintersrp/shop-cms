"use client"

import { type FC } from "react"

import { Tables } from "@/types/supabase"
import { BillboardsRequest, BillboardsSchema } from "@/lib/validation/billboards-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { ImageUpload } from "@/components/ImageUpload"
import { ApiForm } from "@/components/api/components/ApiForm"
import { ApiFormConfig, useApiForm } from "@/components/api/hooks/useApiForm"

interface BillboardFormProps {
  initialData: Tables<"billboards">
}

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const apiFormConfig: ApiFormConfig<BillboardsRequest> = {
    initialData,
    schema: BillboardsSchema,
    apiPath: "billboards",
    paramNames: {
      id: "billboardId",
      slug: "shopSlug",
    },
    toasts: {
      submitSuccess: initialData ? "Billboard updated." : "Billboard created.",
      submitError: "Something went wrong.",
      deleteSuccess: "Billboard was successfully deleted.",
      deleteError: "Make sure you have removed all categories using this billboard first.",
    },
  }

  const { form, isLoading, onSubmit, onDelete } = useApiForm<BillboardsRequest>(apiFormConfig)

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Edit a billboard" : "Add a new billboard"
  const action = initialData ? "Save changes" : "Create"

  return (
    <ApiForm<BillboardsRequest>
      form={form}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onDelete={onDelete}
      title={title}
      description={description}
      action={action}
      hasData={!!initialData}
      innerClass="w-full space-y-8"
    >
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Background image</FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value ? [field.value] : []}
                disabled={isLoading}
                onChange={(url) => field.onChange(url)}
                onRemove={() => field.onChange("")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-3 gap-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Billboard label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </ApiForm>
  )
}

export { BillboardForm }
