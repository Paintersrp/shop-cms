"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { SettingsRequest, SettingsSchema } from "@/lib/validation/settings-form"
import { useOrigin } from "@/hooks/useOrigin"
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
import { ApiItem } from "@/components/ApiItem"
import { Heading } from "@/components/Heading"
import { Icons } from "@/components/Iconss"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface SettingsFormProps {
  initialData: Tables<"shops">
}

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { shopSlug } = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const form = useForm<SettingsRequest>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsRequest) => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/shops/${shopSlug}`, data)

      router.push(`/${data.name}/settings`)
      router.refresh()

      toast.success("Shop has been updated")
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

      await axios.delete(`/api/shops/${shopSlug}`)

      router.refresh()
      router.push("/")

      toast.success("Shop was successfully deleted.")
    } catch (error) {
      toast.error("Make sure you have removed all products and categories first.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
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
                    <Input disabled={isLoading} placeholder="Shop Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Shop Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiItem
        variant="public"
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${shopSlug}`}
      />
    </>
  )
}

export { SettingsForm }
