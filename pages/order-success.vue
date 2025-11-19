<script setup lang="ts">
useHead({
  title: '訂單成功 | Anti-Shop',
  meta: [
    { name: 'description', content: '感謝您的訂購' }
  ]
})

const route = useRoute()
const orderId = route.query.orderId as string
</script>

<template>
  <div class="success-page container">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>訂單成功！</h1>
      <p class="order-id">訂單編號：{{ orderId }}</p>
      <p class="message">感謝您的訂購，我們會盡快為您處理訂單。</p>
      <p class="info">訂單確認信已發送至您的 Email。</p>
      <NuxtLink to="/" class="btn btn-primary btn-lg">
        返回首頁
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: var(--spacing-xl) var(--spacing-sm);
}

.success-card {
  background-color: var(--color-surface);
  padding: var(--spacing-xl);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
}

.success-card h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.order-id {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.message {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
}

.info {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
</style>
