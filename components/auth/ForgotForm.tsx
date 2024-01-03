"use client"

import type { FC } from "react"

import { useAuth } from "@/hooks/auth/useAuth"
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

const ForgotForm: FC = () => {
  const { forgotForm, forgotPassword, isLoading } = useAuth()

  return (
    <Form {...forgotForm}>
      <form
        onSubmit={forgotForm.handleSubmit(forgotPassword)}
        className="flex flex-col w-full justify-center gap-2 text-foreground space-y-2 px-6 pb-2"
      >
        <FormField
          control={forgotForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Email address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isLoading} disabled={isLoading} type="submit" variant="success">
          Send reset link
        </Button>
      </form>
    </Form>
  )
}

export { ForgotForm }
