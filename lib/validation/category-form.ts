import { z } from "zod"

const CategorySchema = z.object({
  name: z.string().min(1),
  billboard_id: z.string(),
})

type CategoryRequest = z.infer<typeof CategorySchema>

export { type CategoryRequest, CategorySchema }
