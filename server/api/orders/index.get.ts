import { db } from '../../database/db'
import { orders } from '../../database/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const userOrders = await db.select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt))

  return { orders: userOrders }
})
