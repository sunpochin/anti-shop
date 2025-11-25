import { categories } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  
  try {
    const allCategories = await db.select().from(categories).all()
    return allCategories
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to fetch categories'
    })
  }
})
