"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { SizeRequest, SizeSchema } from "@/lib/validation/size-form"
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
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface SizeFormProps {
  initialData: Tables<"sizes">
}

const SizeForm: FC<SizeFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { shopSlug, sizeId } = useParams()
  const router = useRouter()

  const title = initialData ? "Edit size" : "Create size"
  const description = initialData ? "Edit a size" : "Add a new size"
  const toastMessage = initialData ? "Size updated." : "Size created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<SizeRequest>({
    resolver: zodResolver(SizeSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      value: initialData?.value ?? "",
    },
  })

  const onSubmit = async (data: SizeRequest) => {
    try {
      setIsLoading(true)

      if (initialData) {
        await axios.patch(`/api/${shopSlug}/sizes/${sizeId}`, data)
      } else {
        await axios.post(`/api/${shopSlug}/sizes`, data)
      }

      router.refresh()
      router.push(`/${shopSlug}/sizes`)

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

      await axios.delete(`/api/${shopSlug}/sizes/${sizeId}`)

      router.refresh()
      router.push(`/${shopSlug}/sizes`)

      toast.success("Size was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all products using this size first.")
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
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export { SizeForm }
