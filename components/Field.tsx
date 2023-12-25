"use client"

import type { FC } from "react"
import { UseFormReturn, useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Text } from "@/components/ui/Text"

interface FieldProps {
  form: UseFormReturn<any, any, any>
  name: string
  label: string
  type?: string
  placeholder?: string
}

const Field: FC<FieldProps> = ({ form, name, label, type, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = form
  return (
    <div>
      <Label className="text-base dark:font-semibold" htmlFor={name}>
        {label}
      </Label>
      <Input
        {...register(name)}
        className="rounded-md px-4 py-2 bg-inherit border mt-0.5 mb-1"
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {errors[name] && (
        <Text variant="red" size="sm" className="font-semibold">
          {`${errors[name]?.message}`}
        </Text>
      )}
    </div>
  )
}

export { Field }
