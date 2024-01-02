import { handleTable } from "@/lib/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "sizes",
  requiredFields: ["name", "value"],
})
