<script setup lang="ts">
import type { Order, OrderItem, Product } from '~/server/database/schema'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const orderId = route.params.id

type OrderDetailResponse = {
  order: Order
  items: (OrderItem & { product: Pick<Product, 'title' | 'image'> | null })[]
}

const { data, error } = await useFetch<OrderDetailResponse>(`/api/orders/${orderId}`)

if (error.value) {
  throw createError({ statusCode: 404, message: 'Order not found' })
}

useHead({
  title: `訂單 #${orderId} | Anti-Shop`,
})
</script>

<template>
  <div class="order-detail-page container">
    <div class="page-header">
      <NuxtLink to="/orders" class="back-link">← 返回訂單列表</NuxtLink>
      <h1 class="page-title">訂單詳情 #{{ orderId }}</h1>
    </div>

    <div v-if="data" class="order-content">
      <div class="order-meta">
        <div class="meta-item">
          <span class="label">下單時間</span>
          <span class="value">{{ data.order.createdAt ? new Date(data.order.createdAt).toLocaleString() : '' }}</span>
        </div>
        <div class="meta-item">
          <span class="label">狀態</span>
          <span class="status" :class="data.order.status">{{ data.order.status }}</span>
        </div>
      </div>

      <div class="order-items">
        <h2>訂單內容</h2>
        <div v-for="item in data.items" :key="item.id" class="item-card">
          <img :src="item.product?.image" :alt="item.product?.title" class="item-image" />
          <div class="item-details">
            <h3>{{ item.product?.title }}</h3>
            <div class="item-price-qty">
              <span class="price">${{ item.price }}</span>
              <span class="qty">x {{ item.quantity }}</span>
            </div>
          </div>
          <div class="item-subtotal">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>

      <div class="order-summary">
        <div class="summary-row total">
          <span>總計</span>
          <span>${{ data.order.totalAmount.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-page {
  padding: var(--spacing-xl) var(--spacing-sm);
  max-width: 800px;
}

.page-header {
  margin-bottom: var(--spacing-xl);
}

.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-muted);
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-primary);
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
}

.order-content {
  background: var(--color-surface);
  border-radius: 1rem;
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.order-meta {
  display: flex;
  gap: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-lg);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.value {
  font-weight: 600;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--color-bg);
}

.status.pending {
  background: #fff7ed;
  color: #c2410c;
}

.order-items h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.item-card {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border);
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  background: var(--color-bg);
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-price-qty {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.item-subtotal {
  font-weight: 700;
}

.order-summary {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
}

.summary-row.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent);
}
</style>
