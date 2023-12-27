"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { BillboardsRequest, BillboardsSchema } from "@/lib/validation/billboards-form"
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
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { ImageUpload } from "@/components/ImageUpload"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface BillboardFormProps {
  initialData: Tables<"billboards">
}

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { shopSlug, billboardId } = useParams()
  const router = useRouter()

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Edit a billboard" : "Add a new billboard"
  const toastMessage = initialData ? "Billboard updated." : "Billboard created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<BillboardsRequest>({
    resolver: zodResolver(BillboardsSchema),
    defaultValues: initialData || {
      label: "",
      image_url: "",
    },
  })

  const onSubmit = async (data: BillboardsRequest) => {
    try {
      setIsLoading(true)

      console.log(data)

      if (initialData) {
        await axios.patch(`/api/${shopSlug}/billboards/${billboardId}`, data)
      } else {
        await axios.post(`/api/${shopSlug}/billboards`, data)
      }

      router.refresh()
      router.push(`/${shopSlug}/billboards`)

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

      await axios.delete(`/api/${shopSlug}/billboards/${billboardId}`)

      router.refresh()
      router.push(`/${shopSlug}/billboards`)

      toast.success("Billboard was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all categories using this billboard first.")
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
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export { BillboardForm }
