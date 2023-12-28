import { handleTable } from "@/components/api/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "sizes",
  requiredFields: ["name", "value"],
})
