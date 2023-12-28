import { handleObjects } from "@/components/api/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "categories",
  objectName: "Category",
  idField: "categoryId",
  requiredFields: ["name", "billboard_id"],
})
