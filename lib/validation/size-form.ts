import { z } from "zod"

const SizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SizeRequest = z.infer<typeof SizeSchema>

export { type SizeRequest, SizeSchema }
