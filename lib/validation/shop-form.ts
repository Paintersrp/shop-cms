import { z } from "zod"

export const ShopFormSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(2).max(30),
})

export type ShopFormRequest = z.infer<typeof ShopFormSchema>
