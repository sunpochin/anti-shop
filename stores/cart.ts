import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

const CART_STORAGE_KEY = 'anti-shop-cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.price * item.quantity, 0))

  // 從 localStorage 載入購物車
  function loadCart() {
    if (process.client) {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        try {
          items.value = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load cart from localStorage:', e)
        }
      }
    }
  }

  // 儲存購物車到 localStorage
  function saveCart() {
    if (process.client) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    }
  }

  function addToCart(product: { id: number; title: string; price: number; image: string }) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    isOpen.value = true
    saveCart()
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }

  // 更新商品數量
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // 增加數量
  function increaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity++
      saveCart()
    }
  }

  // 減少數量
  function decreaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
        saveCart()
      } else {
        removeFromCart(productId)
      }
    }
  }

  // 清空購物車
  function clearCart() {
    items.value = []
    saveCart()
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    loadCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleCart
  }
})
