import { handleObjects } from "@/lib/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "colors",
  objectName: "Color",
  idField: "colorId",
  requiredFields: ["name", "value"],
})
