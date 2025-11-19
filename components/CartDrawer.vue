<script setup lang="ts">
// 購物車 Store（Nuxt 會自動匯入，不需要手動 import）
const cartStore = useCartStore()
</script>

<template>
  <!-- 遮罩層：點擊可關閉購物車 -->
  <div 
    class="cart-drawer-overlay" 
    :class="{ open: cartStore.isOpen }" 
    @click="cartStore.toggleCart"
  ></div>

  <!-- 購物車側邊欄主體 -->
  <div class="cart-drawer" :class="{ open: cartStore.isOpen }">
    
    <!-- 標題列 -->
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <!-- 關閉按鈕 -->
      <button @click="cartStore.toggleCart" class="close-btn">
        <span class="material-icons">close</span>
      </button>
    </div>

    <!-- 購物車商品列表（當有商品時顯示） -->
    <div class="cart-items" v-if="cartStore.items.length > 0">
      <!-- 迴圈顯示每個商品 -->
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <!-- 商品圖片 -->
        <img :src="item.image" :alt="item.title" class="item-image" />
        
        <!-- 商品資訊 -->
        <div class="item-details">
          <!-- 商品名稱 -->
          <h3>{{ item.title }}</h3>
          <!-- 商品價格 -->
          <p class="item-price">${{ item.price.toFixed(2) }}</p>
          
          <!-- 控制區域：數量調整 + 移除按鈕 -->
          <div class="item-controls">
            <!-- 數量調整按鈕組 -->
            <div class="quantity-controls">
              <!-- 減少數量按鈕（數量為 1 時會移除商品） -->
              <button @click="cartStore.decreaseQuantity(item.id)" class="qty-btn">-</button>
              <!-- 顯示目前數量 -->
              <span class="quantity">{{ item.quantity }}</span>
              <!-- 增加數量按鈕 -->
              <button @click="cartStore.increaseQuantity(item.id)" class="qty-btn">+</button>
            </div>
            <!-- 移除商品按鈕 -->
            <button @click="cartStore.removeFromCart(item.id)" class="remove-btn">移除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空購物車提示（當沒有商品時顯示） -->
    <div v-else class="empty-cart">
      <p>購物車是空的</p>
      <!-- 關閉購物車並開始購物 -->
      <button @click="cartStore.toggleCart" class="btn btn-primary">開始購物</button>
    </div>

    <!-- 底部區域：總計 + 結帳按鈕（當有商品時顯示） -->
    <div class="cart-footer" v-if="cartStore.items.length > 0">
      <!-- 總金額 -->
      <div class="total">
        <span>總計:</span>
        <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <!-- 結帳按鈕（導向結帳頁面並關閉購物車） -->
      <NuxtLink to="/checkout" @click="cartStore.toggleCart" class="btn btn-accent checkout-btn">
        前往結帳
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* === 遮罩層樣式 === */
.cart-drawer-overlay {
  position: fixed;        /* 固定定位 */
  top: 0;
  left: 0;
  width: 100%;           /* 全螢幕寬度 */
  height: 100%;          /* 全螢幕高度 */
  background-color: rgba(0, 0, 0, 0.5);  /* 半透明黑色背景 */
  z-index: 199;          /* 在購物車下方 */
  opacity: 0;            /* 預設透明（隱藏） */
  visibility: hidden;    /* 預設不可見 */
  transition: opacity 0.3s;  /* 淡入淡出動畫 */
}

/* 遮罩層開啟狀態 */
.cart-drawer-overlay.open {
  opacity: 1;            /* 顯示遮罩 */
  visibility: visible;   /* 可見 */
}

/* === 購物車側邊欄樣式 === */
.cart-drawer {
  position: fixed;       /* 固定在右側 */
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;      /* 最大寬度 400px */
  height: 100%;          /* 全螢幕高度 */
  background-color: var(--color-surface);
  z-index: 200;          /* 在遮罩上方 */
  transform: translateX(100%);  /* 預設隱藏在右側外面 */
  transition: transform 0.3s ease-in-out;  /* 滑入滑出動畫 */
  display: flex;
  flex-direction: column;  /* 垂直排列 */
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);  /* 左側陰影 */
}

/* 購物車開啟狀態 */
.cart-drawer.open {
  transform: translateX(0);  /* 滑入畫面 */
}

/* === 標題列樣式 === */
.cart-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;  /* 標題和關閉按鈕分別靠左右 */
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

/* === 商品列表區域樣式 === */
.cart-items {
  flex: 1;               /* 佔據剩餘空間 */
  overflow-y: auto;      /* 內容過多時可滾動 */
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);  /* 商品之間的間距 */
}

/* 單個商品項目 */
.cart-item {
  display: flex;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

/* 商品圖片 */
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;     /* 裁切圖片以填滿區域 */
  border-radius: 0.5rem;
}

/* 商品詳細資訊區域 */
.item-details {
  flex: 1;               /* 佔據剩餘空間 */
}

.item-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* 商品價格 */
.item-price {
  font-weight: 700;
  color: var(--color-primary);
}

/* === 控制按鈕區域樣式 === */
.item-controls {
  display: flex;
  justify-content: space-between;  /* 數量控制和移除按鈕分別靠左右 */
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  gap: 0.5rem;
}

/* 數量控制按鈕組 */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  padding: 0.25rem;
}

/* +/- 按鈕樣式 */
.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 0.25rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;  /* 滑鼠移入時的過渡動畫 */
}

/* +/- 按鈕滑鼠移入效果 */
.qty-btn:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* 數量顯示 */
.quantity {
  min-width: 2rem;       /* 最小寬度確保對齊 */
  text-align: center;
  font-weight: 600;
}

/* 移除按鈕 */
.remove-btn {
  color: #ef4444;        /* 紅色 */
  font-weight: 500;
}

/* === 空購物車樣式 === */
.empty-cart {
  flex: 1;               /* 佔據剩餘空間 */
  display: flex;
  flex-direction: column;
  align-items: center;   /* 水平置中 */
  justify-content: center;  /* 垂直置中 */
  gap: var(--spacing-md);
  color: var(--color-text-muted);
}

/* === 底部區域樣式 === */
.cart-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background);
}

/* 總計金額 */
.total {
  display: flex;
  justify-content: space-between;  /* 文字和金額分別靠左右 */
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

/* 結帳按鈕 */
.checkout-btn {
  width: 100%;           /* 全寬按鈕 */
}
</style>
