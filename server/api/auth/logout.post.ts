export default defineEventHandler(async (event) => {
  try {
    // 清除用戶 session
    await clearUserSession(event)

    return {
      success: true,
      message: '登出成功'
    }
  } catch (error: any) {
    console.error('登出錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '登出失敗，請稍後再試'
    })
  }
})
