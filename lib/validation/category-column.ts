import { z } from "zod"

const CategoryColumnSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  billboardLabel: z.string().min(1),
  created_at: z.string().min(1),
})

type CategoryColumnType = z.infer<typeof CategoryColumnSchema>

export { type CategoryColumnType, CategoryColumnSchema }
