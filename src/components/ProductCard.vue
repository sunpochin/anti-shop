<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../services/productService'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

function addToCart() {
  emit('add-to-cart', props.product)
}
</script>

<template>
  <div class="product-card">
    <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="image-container">
      <img :src="product.image" :alt="product.title" loading="lazy" />
    </RouterLink>
    <div class="content">
      <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="title-link">
        <h3 class="title">{{ product.title }}</h3>
      </RouterLink>
      <p class="price">${{ product.price.toFixed(2) }}</p>
      <button @click="addToCart" class="btn btn-primary add-btn">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: var(--color-surface);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.image-container {
  height: 250px;
  overflow: hidden;
  background-color: #f1f5f9;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
}

.content {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.title-link:hover .title {
  color: var(--color-accent);
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.add-btn {
  margin-top: auto;
  width: 100%;
}
</style>
