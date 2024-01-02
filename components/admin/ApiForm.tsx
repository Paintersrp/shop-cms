import type { ReactNode } from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { Icons } from "@/components/ui/Icons"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/admin/Heading"
import { ConfirmationModal } from "@/components/modals/ConfirmationModal"

interface TableFormProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>
  isLoading: boolean

  onSubmit: (data: T) => Promise<void>
  onDelete: () => Promise<void>

  title: string
  description: string
  hasData: boolean
  action: string

  children: ReactNode
  innerClass?: string
}

const ApiForm = <T extends FieldValues>({
  form,
  isLoading,
  onSubmit,
  onDelete,
  title,
  description,
  action,
  hasData,
  children,
  innerClass,
}: TableFormProps<T>): React.ReactElement => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {hasData && (
          <ConfirmationModal isLoading={isLoading} onConfirm={onDelete}>
            <Button
              variant="destructive"
              size="iconSm"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Icons.Delete className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </ConfirmationModal>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className={cn(innerClass ? innerClass : "grid grid-cols-3 gap-8")}>{children}</div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export { ApiForm }
