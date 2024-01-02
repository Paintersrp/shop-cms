"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { ShopFormRequest, ShopFormSchema } from "@/lib/validation/shop-form"
import { useShopModal } from "@/hooks/admin/useShopModal"
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
import { Modal } from "@/components/modals/Modal"

const ShopModal = ({}) => {
  const { open, onClose, onOpen } = useShopModal()

  const [loading, setLoading] = useState(false)

  const form = useForm<ShopFormRequest>({
    resolver: zodResolver(ShopFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  const onSubmit = async (values: ShopFormRequest) => {
    try {
      setLoading(true)

      const { data } = await axios.post("/api/shops", values)

      window.location.assign(`/${data.slug}`)

      toast("Shop created successfully!", {
        description: "Your shop has been created",
      })
    } catch (error) {
      console.log(error)
      toast("Shop creation error!", {
        description: "Something went wrong",
      })

      console.log("[SHOPMODAL]", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Create shop"
      description="Add a new shop to manage products and categories"
      open={open}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
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
                    <FormLabel>Shop URL</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export { ShopModal }
