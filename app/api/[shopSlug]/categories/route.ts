import { handleTable } from "@/components/api/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "categories",
  requiredFields: ["name", "billboard_id"],
})
