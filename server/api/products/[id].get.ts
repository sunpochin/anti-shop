import { db } from '~/server/database/db'
import { products } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

// GET /api/products/:id - 根據 ID 從資料庫取得單一產品
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID is required'
    })
  }

  // 從資料庫查詢產品
  const result = await db.select()
    .from(products)
    .where(eq(products.id, Number(id)))
    .limit(1)

  const product = result[0]

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: `Product with ID ${id} not found`
    })
  }

  return product
})
