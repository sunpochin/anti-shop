import { db } from '~/server/database/db'
import { products } from '~/server/database/schema'

// GET /api/products - 從資料庫取得所有產品
export default defineEventHandler(async () => {
  return await db.select().from(products)
})
