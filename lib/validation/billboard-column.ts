import { z } from "zod"

const BillboardColumnSchema = z.object({
  id: z.number(),
  label: z.string().min(1),
  created_at: z.string().min(1),
})

type BillboardsColumnType = z.infer<typeof BillboardColumnSchema>

export { type BillboardsColumnType, BillboardColumnSchema }
