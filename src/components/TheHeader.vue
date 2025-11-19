<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <RouterLink to="/" class="logo">
        Anti-Shop
      </RouterLink>
      
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <!-- Add more links if needed -->
      </nav>

      <div class="cart-icon" @click="cartStore.toggleCart">
        <span class="material-icons">shopping_cart</span>
        <span v-if="cartStore.totalItems > 0" class="badge">{{ cartStore.totalItems }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--spacing-sm) 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav {
  display: flex;
  gap: var(--spacing-md);
}

.nav-link {
  font-weight: 500;
  color: var(--color-text);
}

.nav-link:hover {
  color: var(--color-accent);
}

.cart-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

/* Material Icons fallback or import if needed. 
   For now, using text or assuming a font is loaded. 
   I'll add Material Icons to index.html or use SVG. 
   Let's use SVG for reliability. */
.material-icons {
  display: none; /* Hide if I replace with SVG */
}
</style>
