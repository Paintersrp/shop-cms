"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { CategoryRequest, CategorySchema } from "@/lib/validation/category-form"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Icons"
import { ApiForm } from "@/components/api/components/ApiForm"
import { ApiFormConfig, useApiForm } from "@/components/api/hooks/useApiForm"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

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
