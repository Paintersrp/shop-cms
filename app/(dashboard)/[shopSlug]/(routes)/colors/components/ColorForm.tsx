"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { ColorRequest, ColorSchema } from "@/lib/validation/color-form"
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

interface ColorFormProps {
  initialData: Tables<"colors">
}

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { shopSlug, colorId } = useParams()
  const router = useRouter()

  const title = initialData ? "Edit color" : "Create color"
  const description = initialData ? "Edit a color" : "Add a new color"
  const toastMessage = initialData ? "Color updated." : "Color created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<ColorRequest>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      value: initialData?.value ?? "",
    },
  })

  const onSubmit = async (data: ColorRequest) => {
    console.log(data)
    try {
      setIsLoading(true)

      if (initialData) {
        await axios.patch(`/api/${shopSlug}/colors/${colorId}`, data)
      } else {
        await axios.post(`/api/${shopSlug}/colors`, data)
      }

      router.refresh()
      router.push(`/${shopSlug}/colors`)

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

      await axios.delete(`/api/${shopSlug}/colors/${colorId}`)

      router.refresh()
      router.push(`/${shopSlug}/colors`)

      toast.success("Color was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all products using this color first.")
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
                    <Input disabled={isLoading} placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* todo color picker */}
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
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export { ColorForm }
