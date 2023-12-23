import { z } from "zod"

export const AuthSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export type AuthRequest = z.infer<typeof AuthSchema>

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1),
})

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>
