"use client"

import { useState, type FC } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthError } from "@supabase/supabase-js"
import { SubmitHandler, useForm } from "react-hook-form"

import { createClient } from "@/lib/supabase/client"
import { ForgotPasswordRequest, ForgotPasswordSchema } from "@/lib/validation/auth"
import { useAuthModal } from "@/hooks/useAuthModal"
import { toast } from "@/hooks/useToast"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Text } from "../ui/Text"

const AuthModalFormForgot: FC = () => {
  const supabase = createClient()
  const router = useRouter()
  const { onClose } = useAuthModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const forgotPassword: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email)

      if (error) throw error

      router.refresh()
    } catch (error) {
      if (error instanceof AuthError) {
        return toast({
          title: error.message,
          description: `The attempt to sign in was unsuccessful. Please try again.`,
          variant: "destructive",
        })
      }

      return toast({
        title: "There was a problem.",
        description: "The attempt to sign in was unsuccessful. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(forgotPassword)}
      className="flex flex-col w-full justify-center gap-2 text-foreground space-y-2 px-6 pb-2"
    >
      <div>
        <Label className="text-base dark:font-semibold" htmlFor="email">
          Email
        </Label>
        <Input
          {...register("email")}
          className="rounded-md px-4 py-2 bg-inherit border mt-0.5 mb-0.5"
          name="email"
          placeholder="you@example.com"
        />
        {errors.email && (
          <Text variant="red" size="sm" className="font-semibold">
            {errors.email.message}
          </Text>
        )}
      </div>

      <Button isLoading={isLoading} type="submit" variant="success">
        Send reset link
      </Button>
    </form>
  )
}

export { AuthModalFormForgot }
