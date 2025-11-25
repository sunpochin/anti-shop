import { sqliteTable, integer, text, real, primaryKey } from 'drizzle-orm/sqlite-core'

// 產品資料表
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  price: real('price').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// 用戶資料表
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// 訂單資料表
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  totalAmount: real('total_amount').notNull(),
  status: text('status').default('pending').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// 訂單明細資料表
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull()
})

// 產品分類資料表
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description')
})

// 產品與分類關聯表 (多對多)
export const productCategories = sqliteTable('product_categories', {
  productId: integer('product_id').references(() => products.id).notNull(),
  categoryId: integer('category_id').references(() => categories.id).notNull()
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.categoryId] })
}))

// 型別推導：從 schema 自動產生 TypeScript 型別
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export type OrderItem = typeof orderItems.$inferSelect
export type NewOrderItem = typeof orderItems.$inferInsert

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert

export type ProductCategory = typeof productCategories.$inferSelect
export type NewProductCategory = typeof productCategories.$inferInsert
