import { handleTable } from "@/components/api/handlers/handleTable"

export const { POST, GET } = handleTable({
  tableName: "billboards",
  requiredFields: ["label", "image_url"],
})
