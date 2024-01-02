import { z } from "zod"

const OrdersSchema = z.object({
  label: z.string().min(1),
  image_url: z.string().min(1),
})

type OrdersRequest = z.infer<typeof OrdersSchema>

export { type OrdersRequest, OrdersSchema }
