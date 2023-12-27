"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { CategoryRequest, CategorySchema } from "@/lib/validation/category-form"
import { Button } from "@/components/ui/Buttonn"
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
import { Icons } from "@/components/Iconss"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface CategoryFormProps {
  initialData: Tables<"categories">
  billboards: Tables<"billboards">[]
}

const CategoryForm: FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { shopSlug, categoryId } = useParams()
  const router = useRouter()

  const title = initialData ? "Edit category" : "Create category"
  const description = initialData ? "Edit a category" : "Add a new category"
  const toastMessage = initialData ? "Category updated." : "Category created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<CategoryRequest>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      billboardId: String(initialData?.billboard_id) ?? "",
    },
  })

  const onSubmit = async (data: CategoryRequest) => {
    console.log(data)
    try {
      setIsLoading(true)

      if (initialData) {
        await axios.patch(`/api/${shopSlug}/categories/${categoryId}`, {
          name: data.name,
          billboardId: Number(data.billboardId),
        })
      } else {
        await axios.post(`/api/${shopSlug}/categories`, {
          name: data.name,
          billboardId: Number(data.billboardId),
        })
      }

      router.refresh()
      router.push(`/${shopSlug}/categories`)

      toast.success(toastMessage)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${shopSlug}/categories/${categoryId}`)

      router.refresh()
      router.push(`/${shopSlug}/categories`)

      toast.success("Category was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all products using this category first.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <ConfirmationModal isLoading={isLoading} onConfirm={onDelete}>
            <Button
              variant="destructive"
              size="iconSm"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Icons.Delete className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </ConfirmationModal>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
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
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
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
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export { CategoryForm }
