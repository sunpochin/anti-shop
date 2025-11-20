<script setup lang="ts">
// Components and stores are auto-imported
const cartStore = useCartStore()
const { loggedIn, user } = useUserSession()

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    // 刷新頁面以清除會話狀態
    navigateTo('/login')
  } catch (error) {
    console.error('登出失敗:', error)
  }
}
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <NuxtLink to="/" class="logo">
        Anti-Shop
      </NuxtLink>

      <div class="header-right">
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">首頁</NuxtLink>
        </nav>

        <div class="auth-section">
          <template v-if="loggedIn">
            <span class="user-name">👤 {{ user?.name }}</span>
            <button @click="handleLogout" class="logout-btn">登出</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="auth-link">登入</NuxtLink>
            <NuxtLink to="/register" class="auth-link auth-link-primary">註冊</NuxtLink>
          </template>
        </div>

        <div class="cart-icon" @click="cartStore.toggleCart">
          <span class="material-icons">🛒</span>
          <span v-if="cartStore.totalItems > 0" class="badge">{{ cartStore.totalItems }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--spacing-sm) 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav {
  display: flex;
  gap: var(--spacing-md);
}

.nav-link {
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-accent);
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-name {
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-surface);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
}

.auth-link {
  font-weight: 500;
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.9rem;
}

.auth-link:hover {
  color: var(--color-accent);
  background: rgba(99, 102, 241, 0.05);
}

.auth-link-primary {
  background: var(--color-primary);
  color: white;
}

.auth-link-primary:hover {
  background: var(--color-accent);
  color: white;
}

.logout-btn {
  background: none;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-text);
  border-radius: 8px;
  transition: all 0.2s;
}

.logout-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: rgba(99, 102, 241, 0.05);
}

.cart-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.cart-icon:hover {
  background: rgba(99, 102, 241, 0.05);
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

.material-icons {
  font-size: 1.5rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .header-right {
    gap: var(--spacing-sm);
  }

  .nav-link,
  .auth-link,
  .logout-btn,
  .user-name {
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
  }
}
</style>
