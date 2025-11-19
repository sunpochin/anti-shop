import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

// 產品資料表
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  price: real('price').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// 型別推導：從 schema 自動產生 TypeScript 型別
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
