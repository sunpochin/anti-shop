import { db } from '~/server/database/db'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    // 驗證必填欄位
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: '請填寫 Email 和密碼'
      })
    }

    // 查找用戶
    const user = await db.select().from(users).where(eq(users.email, email)).get()

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email 或密碼錯誤'
      })
    }

    // 驗證密碼
    const isPasswordValid = await verifyPassword(user.password, password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Email 或密碼錯誤'
      })
    }

    // 設置用戶 session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('登入錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '登入失敗，請稍後再試'
    })
  }
})
