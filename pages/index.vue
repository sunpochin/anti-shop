<script setup lang="ts">
import type { Product } from '~/server/utils/productData'

useHead({
  title: 'Anti-Shop | 精選商品',
  meta: [
    { name: 'description', content: '探索我們精選的優質生活產品系列。' }
  ]
})

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// 初始化篩選狀態
const searchQuery = ref((route.query.q as string) || '')
const minPrice = ref(route.query.minPrice ? Number(route.query.minPrice) : undefined)
const maxPrice = ref(route.query.maxPrice ? Number(route.query.maxPrice) : undefined)
const sort = ref((route.query.sort as string) || 'newest')

// 監聽路由變化同步狀態
watch(() => route.query, (newQuery) => {
  searchQuery.value = (newQuery.q as string) || ''
  minPrice.value = newQuery.minPrice ? Number(newQuery.minPrice) : undefined
  maxPrice.value = newQuery.maxPrice ? Number(newQuery.maxPrice) : undefined
  sort.value = (newQuery.sort as string) || 'newest'
})

// 使用 useFetch 從 API 取得產品資料，並根據路由參數自動重新取得
const { data: products } = await useFetch<Product[]>('/api/products', {
  query: computed(() => ({ 
    category: route.query.category,
    q: route.query.q,
    minPrice: route.query.minPrice,
    maxPrice: route.query.maxPrice,
    sort: route.query.sort
  }))
})

function handleAddToCart(product: Product) {
  cartStore.addToCart(product)
}

function updateFilters() {
  router.push({
    query: {
      ...route.query,
      q: searchQuery.value || undefined,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      sort: sort.value
    }
  })
}

function handleSearch() {
  updateFilters()
}

function handleFilterApply() {
  updateFilters()
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <h1>精選商品</h1>
        <p>探索我們精選的優質生活產品系列。</p>
      </div>
    </div>

    <div class="container">
      <div class="controls-section">
        <SearchBar 
          v-model="searchQuery" 
          @search="handleSearch"
        />
        <ProductFilters
          v-model:minPrice="minPrice"
          v-model:maxPrice="maxPrice"
          v-model:sort="sort"
          @apply="handleFilterApply"
        />
      </div>

      <CategoryNav />
      
      <div v-if="products && products.length > 0" class="product-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
          @add-to-cart="handleAddToCart"
        />
      </div>
      <div v-else class="no-results">
        <p>找不到符合條件的商品。</p>
        <button @click="router.push('/')" class="reset-button">清除篩選</button>
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

.controls-section {
  margin-bottom: var(--spacing-lg);
}

.no-results {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--color-text-muted);
}

.reset-button {
  margin-top: var(--spacing-md);
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text);
}

.reset-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
