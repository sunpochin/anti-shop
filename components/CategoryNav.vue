<script setup lang="ts">
const { data } = await useFetch('/api/categories')
const route = useRoute()
</script>

<template>
  <nav class="category-nav">
    <ul class="category-list">
      <li>
        <NuxtLink 
          to="/" 
          class="category-link"
          :class="{ active: !route.query.category }"
        >
          全部
        </NuxtLink>
      </li>
      <li v-for="category in data" :key="category.id">
        <NuxtLink 
          :to="{ path: '/', query: { category: category.slug } }" 
          class="category-link"
          :class="{ active: route.query.category === category.slug }"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.category-nav {
  margin-bottom: var(--spacing-xl);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
}

.category-list {
  display: flex;
  gap: var(--spacing-md);
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
}

.category-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid var(--color-border);
}

.category-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.category-link.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>
