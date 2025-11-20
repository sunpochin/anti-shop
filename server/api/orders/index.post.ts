import { db } from '../../database/db'
import { orders, orderItems } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { items, totalAmount } = body

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Cart is empty'
    })
  }

  // Start transaction
  const order = await db.transaction(async (tx) => {
    // Create order
    const [newOrder] = await tx.insert(orders).values({
      userId: session.user.id,
      totalAmount: totalAmount,
      status: 'pending'
    }).returning()

    if (!newOrder) {
      throw new Error('Failed to create order')
    }

    // Create order items
    const newOrderItems = items.map((item: any) => ({
      orderId: newOrder.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }))

    await tx.insert(orderItems).values(newOrderItems)

    return newOrder
  })

  return { order }
})
