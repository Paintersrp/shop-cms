import { z } from "zod"

const BillboardsSchema = z.object({
  label: z.string().min(1),
  image_url: z.string().min(1),
})

type BillboardsRequest = z.infer<typeof BillboardsSchema>

export { type BillboardsRequest, BillboardsSchema }
