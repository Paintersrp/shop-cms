import { handleTable } from "@/lib/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "colors",
  requiredFields: ["name", "value"],
})
