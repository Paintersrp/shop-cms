import { handleObjects } from "@/lib/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "categories",
  objectName: "Category",
  idField: "categoryId",
  requiredFields: ["name", "billboard_id"],
})
