<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  localValue.value = value
  emit('update:modelValue', value)
}

function handleSearch() {
  emit('search')
}
</script>

<template>
  <div class="search-bar">
    <input 
      type="text" 
      :value="localValue"
      @input="handleInput"
      @keyup.enter="handleSearch"
      placeholder="搜尋商品..."
      class="search-input"
    />
    <button @click="handleSearch" class="search-button">
      搜尋
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  padding: 0.5rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.search-button:hover {
  opacity: 0.9;
}
</style>
