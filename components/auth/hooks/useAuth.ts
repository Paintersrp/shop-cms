import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthError } from "@supabase/supabase-js"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { useUserStore } from "@/lib/stores/user"
import { createClient } from "@/lib/supabase/client"
import {
  AuthRequest,
  AuthSchema,
  ForgotPasswordRequest,
  ForgotPasswordSchema,
} from "@/lib/validation/auth"

import { useAuthModal } from "./useAuthModal"

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { onClose } = useAuthModal()
  const { setUser } = useUserStore()
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<AuthRequest>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const forgotForm = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const signIn: SubmitHandler<AuthRequest> = async (data) => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (pathname === "/sign-in") {
        router.push("/")
      }

      router.refresh()
      onClose()

      toast.success("Login successful", {
        description: `You have been successfully logged in`,
      })
    } catch (error) {
      handleAuthError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp: SubmitHandler<AuthRequest> = async (data) => {
    setIsLoading(true)

    try {
      // TODO emailRedirectTo
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (pathname === "/sign-up") {
        router.push("/")
      }

      router.refresh()
      onClose()

      toast.success("Registration successful", {
        description: `You have been successfully registered and logged in`,
      })
    } catch (error) {
      handleAuthError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email)

      if (error) throw error

      if (pathname === "/forgot") {
        router.push("/")
      }

      router.refresh()
      onClose()

      toast.success("Password reset email has been sent", {
        description: `Please check your email for further instructions on how to reset your password.`,
      })
    } catch (error) {
      handleAuthError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      setUser(null)
      router.refresh()
      onClose()

      toast.success("Logout successful", {
        description: "You have been successfully logged out",
      })
    } catch (error) {
      toast.error("Logout error", {
        description: "There was an error logging out. Please try again",
      })
    }
  }

  const handleAuthError = (error: unknown) => {
    if (error instanceof AuthError) {
      return toast.error(error.message, {
        description: `Authentication error. Please try again.`,
      })
    }

    console.log(error)

    return toast.error("There was a problem.", {
      description: `Authentication error. Please try again.`,
    })
  }

  return { form, forgotForm, isLoading, signIn, signUp, signOut, forgotPassword }
}

export { useAuth }
