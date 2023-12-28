import { z } from "zod"

const ProductSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(0.01),
  category_id: z.string().min(1),
  color_id: z.string().min(1),
  size_id: z.string().min(1),
  is_featured: z.boolean().default(false).optional(),
  is_archived: z.boolean().default(false).optional(),
})

type ProductRequest = z.infer<typeof ProductSchema>

export { type ProductRequest, ProductSchema }
