<script setup lang="ts">
import type { Order } from '~/server/database/schema'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '我的訂單 | Anti-Shop',
  meta: [
    { name: 'description', content: '查看您的歷史訂單' }
  ]
})

const { data: ordersData } = await useFetch<{ orders: Order[] }>('/api/orders')
</script>

<template>
  <div class="orders-page container">
    <h1 class="page-title">我的訂單</h1>

    <div v-if="!ordersData?.orders?.length" class="empty-state">
      <p>您還沒有任何訂單</p>
      <NuxtLink to="/" class="btn btn-primary">去購物</NuxtLink>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in ordersData.orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <span class="order-id">訂單編號 #{{ order.id }}</span>
            <span class="order-date">{{ order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '' }}</span>
          </div>
          <span class="order-status" :class="order.status">{{ order.status }}</span>
        </div>
        <div class="order-footer">
          <span class="order-total">總計: ${{ order.totalAmount.toFixed(2) }}</span>
          <NuxtLink :to="`/orders/${order.id}`" class="btn btn-outline btn-sm">
            查看詳情
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  padding: var(--spacing-xl) var(--spacing-sm);
  max-width: 800px;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: 1rem;
}

.empty-state p {
  margin-bottom: var(--spacing-md);
  color: var(--color-text-muted);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.order-card {
  background: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-id {
  font-weight: 700;
  font-size: 1.1rem;
}

.order-date {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--color-bg);
}

.order-status.pending {
  background: #fff7ed;
  color: #c2410c;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.order-total {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-accent);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>
