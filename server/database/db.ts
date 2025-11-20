import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

// 建立 SQLite 連線
const sqlite = new Database('./data/sqlite.db')

// 建立 Drizzle 實例
export const db = drizzle(sqlite, { schema })
