"use client"

import { type FC } from "react"

import { useAuth } from "@/hooks/auth/useAuth"

import { AuthForm } from "./AuthForm"

const SignUpForm: FC = () => {
  const { form, signUp, isLoading } = useAuth()

  return (
    <AuthForm
      onSubmit={form.handleSubmit(signUp)}
      form={form}
      buttonText="Sign Up"
      isLoading={isLoading}
    />
  )
}

export { SignUpForm }
