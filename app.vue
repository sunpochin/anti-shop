<script setup lang="ts">
import { onMounted } from 'vue'
// Components are auto-imported

// 載入購物車資料
const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <div class="app-layout">
    <TheHeader />
    <CartDrawer />
    <main>
      <NuxtPage />
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
