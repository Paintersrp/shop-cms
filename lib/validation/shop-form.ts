import { z } from "zod"

export const ShopFormSchema = z.object({
  name: z.string().min(1),
})

export type ShopFormRequest = z.infer<typeof ShopFormSchema>
