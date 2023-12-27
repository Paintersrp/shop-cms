import { z } from "zod"

const ColorColumnSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  value: z.string().min(1),
  created_at: z.string().min(1),
})

type ColorColumnType = z.infer<typeof ColorColumnSchema>

export { type ColorColumnType, ColorColumnSchema }
