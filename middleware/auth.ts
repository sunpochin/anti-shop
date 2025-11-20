export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // 如果用戶未登入，重定向到登入頁
  if (!loggedIn.value) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
