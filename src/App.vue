<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<template>
  <div class="app-layout">
    <TheHeader />
    <CartDrawer />
    <main>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
