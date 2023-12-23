"use client"

import { useState, type FC } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthError } from "@supabase/supabase-js"
import { SubmitHandler, useForm } from "react-hook-form"

import { createClient } from "@/lib/supabase/client"
import { AuthRequest, AuthSchema } from "@/lib/validation/auth"
import { useAuthModal } from "@/hooks/useAuthModal"
import { toast } from "@/hooks/useToast"

import { AuthForm } from "./AuthForm"

const AuthModalFormSignIn: FC = () => {
  const supabase = createClient()
  const router = useRouter()
  const { view, onClose } = useAuthModal()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthRequest>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signInWithEmail: SubmitHandler<AuthRequest> = async (data) => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

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
    <AuthForm
      onSubmit={form.handleSubmit(signInWithEmail)}
      form={form}
      view={view}
      isLoading={isLoading}
    />
  )
}

export { AuthModalFormSignIn }
