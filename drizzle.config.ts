import type { Config } from 'drizzle-kit'

export default {
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./data/sqlite.db'
  }
} satisfies Config
