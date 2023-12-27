import { z } from "zod"

const ColorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type ColorRequest = z.infer<typeof ColorSchema>

export { type ColorRequest, ColorSchema }
