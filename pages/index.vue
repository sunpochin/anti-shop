<script setup lang="ts">
import type { Product } from '~/server/utils/productData'

useHead({
  title: 'Anti-Shop | Curated Essentials',
  meta: [
    { name: 'description', content: 'Discover our premium collection of lifestyle products.' }
  ]
})

const cartStore = useCartStore()

// 使用 useFetch 從 API 取得產品資料
const { data: products } = await useFetch<Product[]>('/api/products')

function handleAddToCart(product: Product) {
  cartStore.addToCart(product)
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <h1>Curated Essentials</h1>
        <p>Discover our premium collection of lifestyle products.</p>
      </div>
    </div>

    <div class="container">
      <div class="product-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
}

.hero p {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  color: rgba(255, 255, 255, 0.8);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
}
</style>
