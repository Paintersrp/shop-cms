import { z } from "zod"

const SettingsSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(2).max(30),
})

type SettingsRequest = z.infer<typeof SettingsSchema>

export { type SettingsRequest, SettingsSchema }
