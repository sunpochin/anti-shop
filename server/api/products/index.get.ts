import { db } from '~/server/database/db'
import { products, categories, productCategories } from '~/server/database/schema'
import { eq, like, or, and, gte, lte, asc, desc } from 'drizzle-orm'

// GET /api/products - 從資料庫取得所有產品，支援分類篩選、搜尋、價格篩選與排序
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const categorySlug = query.category as string
  const q = query.q as string
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined
  const sort = query.sort as string

  let queryBuilder = db.select({
    id: products.id,
    title: products.title,
    price: products.price,
    description: products.description,
    image: products.image,
    createdAt: products.createdAt
  }).from(products).$dynamic()

  // 建立篩選條件陣列
  const conditions = []

  // 搜尋條件 (標題或描述包含關鍵字)
  if (q) {
    conditions.push(or(like(products.title, `%${q}%`), like(products.description, `%${q}%`)))
  }

  // 價格篩選
  if (minPrice !== undefined && !isNaN(minPrice)) {
    conditions.push(gte(products.price, minPrice))
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    conditions.push(lte(products.price, maxPrice))
  }

  // 分類篩選 (需透過 join)
  if (categorySlug) {
    queryBuilder = queryBuilder
      .innerJoin(productCategories, eq(products.id, productCategories.productId))
      .innerJoin(categories, eq(productCategories.categoryId, categories.id)) as any
    
    conditions.push(eq(categories.slug, categorySlug))
  }

  // 應用所有篩選條件
  if (conditions.length > 0) {
    queryBuilder = queryBuilder.where(and(...conditions)) as any
  }

  // 排序邏輯
  if (sort === 'price-asc') {
    queryBuilder = queryBuilder.orderBy(asc(products.price)) as any
  } else if (sort === 'price-desc') {
    queryBuilder = queryBuilder.orderBy(desc(products.price)) as any
  } else {
    // 預設依建立時間排序 (最新)
    queryBuilder = queryBuilder.orderBy(desc(products.createdAt)) as any
  }

  return await queryBuilder
})
