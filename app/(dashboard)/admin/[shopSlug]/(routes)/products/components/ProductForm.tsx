"use client"

import { type FC } from "react"

import { Tables } from "@/types/supabase"
import { ProductRequest, ProductSchema } from "@/lib/validation/products-form"
import { ApiFormConfig, useApiForm } from "@/hooks/admin/useApiForm"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/admin/Heading"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface ProductFormProps {
  initialData: any | null
  categories: Tables<"categories">[]
  sizes: Tables<"sizes">[]
  colors: Tables<"colors">[]
}

const ProductForm: FC<ProductFormProps> = ({ initialData, categories, sizes, colors }) => {
  const formattedInitialData = initialData
    ? {
        ...initialData,
        category_id: String(initialData?.category_id),
        size_id: String(initialData?.size_id),
        color_id: String(initialData?.color_id),
        price: parseFloat(String(initialData?.price)),
        images: initialData?.images ?? [],
      }
    : {
        name: "",
        images: [],
        price: 0.01,
        category_id: undefined,
        color_id: undefined,
        size_id: undefined,
        is_archived: false,
        is_featured: false,
      }

  const apiFormConfig: ApiFormConfig<ProductRequest> = {
    existingData: !!initialData,
    initialData: formattedInitialData,
    schema: ProductSchema,
    apiPath: "products",
    paramNames: {
      id: "productId",
      slug: "shopSlug",
    },
    toasts: {
      submitSuccess: !!initialData ? "Product updated." : "Product created.",
      submitError: "Something went wrong.",
      deleteSuccess: "Product was successfully deleted.",
      deleteError: "Something went wrong.",
    },
  }

  const { form, isLoading, onSubmit, onDelete } = useApiForm<ProductRequest>(apiFormConfig)

  const title = !!initialData ? "Edit product" : "Create product"
  const description = !!initialData ? "Edit a product" : "Add a new product"
  const action = !!initialData ? "Save changes" : "Create"

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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isLoading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) =>
                      field.onChange([...field.value.filter((current) => current.url !== url)])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.25"
                      disabled={isLoading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={String(size.id)}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={String(color.id)}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Featured</FormLabel>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border px-3 py-3">
                    <FormControl className="mt-1">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none whitespace-pre-wrap">
                      <FormLabel className="whitespace-pre-wrap">
                        Should this product be featured?
                      </FormLabel>
                      <FormDescription className="whitespace-pre-wrap">
                        Product will appear on the home page
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="is_archived"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Archived</FormLabel>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border px-3 py-3">
                    <FormControl className="mt-1">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none whitespace-pre-wrap">
                      <FormLabel className="whitespace-pre-wrap">
                        Should this product be archived?
                      </FormLabel>
                      <FormDescription className="whitespace-pre-wrap">
                        Product will not appear anywhere in the store.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
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

export { ProductForm }
