import { handleObjects } from "@/components/api/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "sizes",
  objectName: "Size",
  idField: "sizeId",
  requiredFields: ["name", "value"],
})
