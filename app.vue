<script setup lang="ts">
// Components are auto-imported
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
