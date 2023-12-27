import { z } from "zod"

const SizeColumnSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  value: z.string().min(1),
  created_at: z.string().min(1),
})

type SizeColumnType = z.infer<typeof SizeColumnSchema>

export { type SizeColumnType, SizeColumnSchema }
