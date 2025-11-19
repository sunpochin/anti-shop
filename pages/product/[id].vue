<script setup lang="ts">
import type { Product } from '~/server/utils/productData'

const route = useRoute()
const cartStore = useCartStore()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

// 使用 useFetch 從 API 取得產品資料
const { data: product } = await useFetch<Product>(`/api/products/${id}`)

useHead({
  title: () => product.value ? `${product.value.title} | Anti-Shop` : '找不到商品',
  meta: [
    { name: 'description', content: () => product.value?.description || '商品詳情' }
  ]
})

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <div v-if="product" class="product-detail container">
    <div class="image-wrapper">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="info">
      <h1 class="title">{{ product.title }}</h1>
      <p class="price">${{ product.price.toFixed(2) }}</p>
      <p class="description">{{ product.description }}</p>
      <button @click="addToCart" class="btn btn-primary btn-lg">Add to Cart</button>
    </div>
  </div>
  <div v-else class="container not-found">
    <p>Product not found.</p>
  </div>
</template>

<style scoped>
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-sm);
  align-items: start;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}

.image-wrapper {
  border-radius: 1rem;
  overflow: hidden;
  background-color: #f1f5f9;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
}

.price {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-accent);
}

.description {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  margin-top: var(--spacing-md);
  align-self: start;
}

.not-found {
  padding: var(--spacing-xl);
  text-align: center;
  font-size: 1.5rem;
}
</style>
