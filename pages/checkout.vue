<script setup lang="ts">
import type { Product } from '~/server/utils/productData'

useHead({
  title: '結帳 | Anti-Shop',
  meta: [
    { name: 'description', content: '完成您的訂單' }
  ]
})

const cartStore = useCartStore()
const router = useRouter()

// 表單資料
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// 表單錯誤
const errors = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// 驗證表單
function validateForm() {
  let isValid = true
  errors.value = { name: '', email: '', phone: '', address: '' }

  if (!form.value.name.trim()) {
    errors.value.name = '請輸入姓名'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = '請輸入 Email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email 格式不正確'
    isValid = false
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = '請輸入電話'
    isValid = false
  }

  if (!form.value.address.trim()) {
    errors.value.address = '請輸入地址'
    isValid = false
  }

  return isValid
}

// 送出訂單
function submitOrder() {
  if (!validateForm()) {
    return
  }

  // 生成訂單編號
  const orderId = 'ORD-' + Date.now()
  
  // 清空購物車
  cartStore.clearCart()
  
  // 導向成功頁面
  router.push(`/order-success?orderId=${orderId}`)
}

// 如果購物車是空的，導回首頁
onMounted(() => {
  if (cartStore.items.length === 0) {
    router.push('/')
  }
})
</script>

<template>
  <div class="checkout-page container">
    <h1 class="page-title">結帳</h1>
    
    <div class="checkout-grid">
      <!-- 左側：訂單摘要 -->
      <div class="order-summary">
        <h2>訂單摘要</h2>
        <div class="summary-items">
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.title" />
            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p class="item-qty">數量: {{ item.quantity }}</p>
            </div>
            <p class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
        <div class="summary-total">
          <span>總計</span>
          <span class="total-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
      </div>

      <!-- 右側：配送資訊表單 -->
      <div class="shipping-form">
        <h2>配送資訊</h2>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name"
              :class="{ error: errors.name }"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              :class="{ error: errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone">電話 *</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone"
              :class="{ error: errors.phone }"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label for="address">地址 *</label>
            <textarea 
              id="address" 
              v-model="form.address"
              rows="3"
              :class="{ error: errors.address }"
            ></textarea>
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>

          <button type="submit" class="btn btn-accent btn-lg submit-btn">
            確認訂單
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  padding: var(--spacing-xl) var(--spacing-sm);
  max-width: 1200px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

/* 訂單摘要 */
.order-summary {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
}

.order-summary h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.summary-item {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-qty {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.item-total {
  font-weight: 700;
  color: var(--color-primary);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--color-border);
  font-size: 1.5rem;
  font-weight: 700;
}

.total-price {
  color: var(--color-accent);
}

/* 配送表單 */
.shipping-form {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
}

.shipping-form h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  margin-top: var(--spacing-md);
}
</style>
