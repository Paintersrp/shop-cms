import { handleObjects } from "@/components/api/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "colors",
  objectName: "Color",
  idField: "colorId",
  requiredFields: ["name", "value"],
})
