import { handleObjects } from "@/lib/handlers/handleObjects"

export const { GET, PATCH, DELETE } = handleObjects({
  tableName: "billboards",
  objectName: "Billboard",
  idField: "billboardId",
  requiredFields: ["label", "image_url"],
})
