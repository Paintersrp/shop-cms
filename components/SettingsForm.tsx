"use client"

import { useState, type FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { SettingsRequest, SettingsSchema } from "@/lib/validation/settings-form"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Heading } from "@/components/ui/Heading"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import { Icons } from "@/components/Icons"

interface SettingsFormProps {
  initialData: Tables<"shops">
}

// 3:10:47

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { storeName } = useParams()
  const router = useRouter()

  const form = useForm<SettingsRequest>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsRequest) => {
    try {
      setIsLoading(true)

      axios.patch(`/api/shops/${storeName}`, data)
      router.push(`/${data.name}/settings`)
      router.refresh()
      toast.success("Store name has been updated")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="iconSm"
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          <Icons.Delete className="h-4 w-4" />
        </Button>
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
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  )
}

export { SettingsForm }
