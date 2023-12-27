import type { FC } from "react"
import type { UseFormReturn } from "react-hook-form"

import { AuthRequest } from "@/lib/validation/auth"
import { Button } from "@/components/ui/Buttonn"
import { Field } from "@/components/Field"

interface AuthFormProps {
  onSubmit: () => void
  form: UseFormReturn<AuthRequest, any, undefined>
  buttonText: string
  isLoading: boolean
}

const AuthForm: FC<AuthFormProps> = ({ onSubmit, form, buttonText, isLoading }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full justify-center gap-2 text-foreground space-y-2 px-6 pb-2"
    >
      <Field form={form} label="Email" name="email" placeholder="you@example.com" />
      <Field form={form} label="Password" name="password" placeholder="••••••••" type="password" />

      <Button isLoading={isLoading} disabled={isLoading} type="submit" variant="success">
        {buttonText}
      </Button>
    </form>
  )
}

export { AuthForm }
