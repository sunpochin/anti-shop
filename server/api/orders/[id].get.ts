import { db } from '../../database/db'
import { orders, orderItems, products } from '../../database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing order ID' })
  }

  // Get order and verify ownership
  const [order] = await db.select()
    .from(orders)
    .where(and(
      eq(orders.id, parseInt(id)),
      eq(orders.userId, session.user.id)
    ))

  if (!order) {
    throw createError({ statusCode: 404, message: 'Order not found' })
  }

  // Get order items with product details
  const items = await db.select({
    id: orderItems.id,
    quantity: orderItems.quantity,
    price: orderItems.price,
    product: {
      title: products.title,
      image: products.image
    }
  })
  .from(orderItems)
  .leftJoin(products, eq(orderItems.productId, products.id))
  .where(eq(orderItems.orderId, order.id))

  return { order, items }
})
