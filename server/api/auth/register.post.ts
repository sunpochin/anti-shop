import { db } from '~/server/database/db'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const { email, password, name } = await readBody(event)

    // 驗證必填欄位
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        message: '請填寫所有必填欄位'
      })
    }

    // 驗證 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email 格式不正確'
      })
    }

    // 驗證密碼長度
    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        message: '密碼長度至少需要 6 個字元'
      })
    }

    // 檢查 email 是否已存在
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get()

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: '此 Email 已被註冊'
      })
    }

    // 雜湊密碼
    const hashedPassword = await hashPassword(password)

    // 創建新用戶
    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    }).returning().get()

    // 設置用戶 session
    await setUserSession(event, {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('註冊錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '註冊失敗，請稍後再試'
    })
  }
})
