import { handleTable } from "@/components/api/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "colors",
  requiredFields: ["name", "value"],
})
