<script setup lang="ts">
const props = defineProps<{
  minPrice?: number
  maxPrice?: number
  sort?: string
}>()

const emit = defineEmits<{
  (e: 'update:minPrice', value: number | undefined): void
  (e: 'update:maxPrice', value: number | undefined): void
  (e: 'update:sort', value: string): void
  (e: 'apply'): void
}>()

const localMinPrice = ref(props.minPrice)
const localMaxPrice = ref(props.maxPrice)
const localSort = ref(props.sort || 'newest')

watch(() => props.minPrice, (val) => localMinPrice.value = val)
watch(() => props.maxPrice, (val) => localMaxPrice.value = val)
watch(() => props.sort, (val) => localSort.value = val || 'newest')

function handleApply() {
  emit('update:minPrice', localMinPrice.value)
  emit('update:maxPrice', localMaxPrice.value)
  emit('update:sort', localSort.value)
  emit('apply')
}
</script>

<template>
  <div class="product-filters">
    <div class="filter-group">
      <label>價格範圍</label>
      <div class="price-inputs">
        <input 
          type="number" 
          v-model.number="localMinPrice" 
          placeholder="最低"
          min="0"
        />
        <span>-</span>
        <input 
          type="number" 
          v-model.number="localMaxPrice" 
          placeholder="最高"
          min="0"
        />
      </div>
    </div>

    <div class="filter-group">
      <label>排序</label>
      <select v-model="localSort">
        <option value="newest">最新上架</option>
        <option value="price-asc">價格：低到高</option>
        <option value="price-desc">價格：高到低</option>
      </select>
    </div>

    <button @click="handleApply" class="apply-button">
      應用篩選
    </button>
  </div>
</template>

<style scoped>
.product-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  align-items: flex-end;
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: var(--spacing-xl);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.price-inputs input {
  width: 100px;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  min-width: 150px;
}

.apply-button {
  padding: 0.5rem 1.5rem;
  background-color: var(--color-text);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.apply-button:hover {
  opacity: 0.9;
}
</style>
