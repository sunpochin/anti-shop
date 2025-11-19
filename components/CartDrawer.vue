<script setup lang="ts">
// Components and stores are auto-imported
const cartStore = useCartStore()
</script>

<template>
  <div class="cart-drawer-overlay" :class="{ open: cartStore.isOpen }" @click="cartStore.toggleCart"></div>
  <div class="cart-drawer" :class="{ open: cartStore.isOpen }">
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button @click="cartStore.toggleCart" class="close-btn">
        <span class="material-icons">close</span>
      </button>
    </div>

    <div class="cart-items" v-if="cartStore.items.length > 0">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" class="item-image" />
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <p class="item-price">${{ item.price.toFixed(2) }}</p>
          <div class="item-controls">
            <span class="quantity">Qty: {{ item.quantity }}</span>
            <button @click="cartStore.removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
      <button @click="cartStore.toggleCart" class="btn btn-primary">Start Shopping</button>
    </div>

    <div class="cart-footer" v-if="cartStore.items.length > 0">
      <div class="total">
        <span>Total:</span>
        <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button class="btn btn-accent checkout-btn">Checkout</button>
    </div>
  </div>
</template>

<style scoped>
.cart-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 199;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
}

.cart-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: var(--color-surface);
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.cart-drawer.open {
  transform: translateX(0);
}

.cart-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.close-btn {
  padding: 0.5rem;
  cursor: pointer;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-item {
  display: flex;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-price {
  font-weight: 700;
  color: var(--color-primary);
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.remove-btn {
  color: #ef4444;
  font-weight: 500;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  color: var(--color-text-muted);
}

.cart-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.checkout-btn {
  width: 100%;
}
</style>
