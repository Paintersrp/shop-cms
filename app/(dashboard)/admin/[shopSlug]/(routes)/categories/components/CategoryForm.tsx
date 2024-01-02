"use client"

import { type FC } from "react"

import { Tables } from "@/types/supabase"
import { CategoryRequest, CategorySchema } from "@/lib/validation/category-form"
import { ApiFormConfig, useApiForm } from "@/hooks/admin/useApiForm"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { ApiForm } from "@/components/admin/ApiForm"

interface CategoryFormProps {
  initialData: Tables<"categories">
  billboards: Tables<"billboards">[]
}

const CategoryForm: FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const formattedInitialData = initialData
    ? {
        name: initialData?.name,
        billboard_id: String(initialData?.billboard_id),
      }
    : null

  const apiFormConfig: ApiFormConfig<CategoryRequest> = {
    existingData: !!initialData,
    initialData: formattedInitialData,
    schema: CategorySchema,
    apiPath: "categories",
    paramNames: {
      id: "categoryId",
      slug: "shopSlug",
    },
    toasts: {
      submitSuccess: initialData ? "Category updated." : "Category created.",
      submitError: "Something went wrong.",
      deleteSuccess: "Category was successfully deleted.",
      deleteError: "Make sure you have removed all products using this category first.",
    },
  }

  const { form, isLoading, onSubmit, onDelete } = useApiForm<CategoryRequest>(apiFormConfig)

  const title = initialData ? "Edit category" : "Create category"
  const description = initialData ? "Edit a category" : "Add a new category"
  const action = initialData ? "Save changes" : "Create"

  return (
    <ApiForm<CategoryRequest>
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
              <Input disabled={isLoading} placeholder="Category name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billboard_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Billboard</FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              value={String(field.value)}
              defaultValue={String(field.value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={String(field.value)}
                    placeholder="Select a billboard"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {billboards.map((billboard) => (
                  <SelectItem key={billboard.id} value={String(billboard.id)}>
                    {billboard.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </ApiForm>
  )
}

export { CategoryForm }
