import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { DefaultValues, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface ApiFormConfig<T> {
  existingData: boolean
  initialData: T | null
  schema: z.ZodObject<any>

  apiPath: string
  paramNames: {
    id: string
    slug: string
  }

  toasts?: {
    submitSuccess?: string
    submitError?: string
    deleteSuccess?: string
    deleteError?: string
  }
}

const useApiForm = <T extends {}>({
  existingData,
  initialData,
  schema,
  apiPath,
  paramNames,
  toasts = {
    submitSuccess: "Successful operation.",
    submitError: "Something went wrong.",
    deleteSuccess: "Deletion successful.",
    deleteError: "Something went wrong.",
  },
}: ApiFormConfig<T>) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const routeParams = useParams()

  const params = {
    id: routeParams[paramNames.id] || "",
    slug: routeParams[paramNames.slug] || "",
  }

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialData as DefaultValues<T>,
  })

  const onSubmit = async (data: T) => {
    try {
      setIsLoading(true)

      if (existingData) {
        await axios.patch(`/api/${params.slug}/${apiPath}/${params.id}`, data)
      } else {
        await axios.post(`/api/${params.slug}/${apiPath}`, data)
      }

      router.refresh()
      router.push(`/${params.slug}/${apiPath}`)

      toast.success(toasts.submitSuccess)
    } catch (error) {
      console.log(error)
      toast.error(toasts.submitError)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${params.slug}/${apiPath}/${params.id}`)

      router.refresh()
      router.push(`/${params.slug}/${apiPath}`)

      toast.success(toasts.deleteSuccess)
    } catch (error) {
      toast.error(toasts.deleteError)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, isLoading, onSubmit, onDelete }
}

export { type ApiFormConfig, useApiForm }
