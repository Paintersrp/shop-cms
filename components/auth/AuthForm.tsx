import type { FC } from "react"
import { UseFormReturn } from "react-hook-form"

import { AuthRequest } from "@/lib/validation/auth"
import { View } from "@/hooks/useAuthModal"

import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Text } from "../ui/Text"

interface AuthFormProps {
  onSubmit: () => void
  form: UseFormReturn<AuthRequest, any, undefined>
  view: View
  isLoading: boolean
}

const AuthForm: FC<AuthFormProps> = ({ onSubmit, form, view, isLoading }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <form
      onSubmit={onSubmit}
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

      <div>
        <Label className="text-base dark:font-semibold" htmlFor="password">
          Password
        </Label>
        <Input
          {...register("password")}
          className="rounded-md px-4 py-2 bg-inherit border mt-0.5 mb-0.5"
          type="password"
          name="password"
          placeholder="••••••••"
        />

        {errors.password && (
          <Text variant="red" size="sm" className="font-semibold">
            {errors.password.message}
          </Text>
        )}
      </div>

      {view === "sign-in" && (
        <Button isLoading={isLoading} type="submit" variant="success">
          Sign In
        </Button>
      )}

      {view === "sign-up" && (
        <Button isLoading={isLoading} type="submit" variant="success">
          Sign Up
        </Button>
      )}
    </form>
  )
}

export { AuthForm }
