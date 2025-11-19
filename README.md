# Anti-Shop 電商前端專案

一個使用 Nuxt 3 + TypeScript 打造的現代化電商網站前端，具備 SSR（伺服器端渲染）功能，提供優秀的 SEO 和使用者體驗。

## ✨ 特色功能

- 🎨 **現代化設計**：採用簡約風格，支援響應式設計
- ⚡ **伺服器端渲染**：使用 Nuxt 3 SSR 提升 SEO 和首屏載入速度
- 🛒 **購物車功能**：使用 Pinia 進行狀態管理
- 🔍 **SEO 優化**：每個頁面都有動態 meta 標籤
- 📱 **響應式設計**：支援各種裝置尺寸
- 🎯 **TypeScript**：完整的型別檢查，提升開發體驗

## 🛠️ 技術棧

- **框架**：[Nuxt 3](https://nuxt.com/)
- **語言**：TypeScript
- **狀態管理**：[Pinia](https://pinia.vuejs.org/)
- **套件管理**：Bun
- **樣式**：原生 CSS

## 📦 安裝與執行

### 安裝依賴

```bash
bun install
```

### 開發模式

```bash
bun run dev
```

開發伺服器會在 `http://localhost:3000` 啟動

### 建置專案

```bash
bun run build
```

### 預覽正式版本

```bash
bun run preview
```

### 型別檢查

```bash
bun run nuxi typecheck
```

## 📁 專案結構

```
anti-shop/
├── app.vue              # 主應用程式元件
├── nuxt.config.ts       # Nuxt 設定檔
├── tsconfig.json        # TypeScript 設定
├── assets/              # 靜態資源（CSS、圖片等）
├── components/          # Vue 元件
│   ├── CartDrawer.vue   # 購物車側邊欄
│   ├── ProductCard.vue  # 產品卡片
│   ├── TheHeader.vue    # 頁首
│   └── TheFooter.vue    # 頁尾
├── pages/               # 頁面（自動路由）
│   ├── index.vue        # 首頁
│   └── product/
│       └── [id].vue     # 產品詳情頁
├── stores/              # Pinia 狀態管理
│   └── cart.ts          # 購物車 store
├── utils/               # 工具函式
│   └── productService.ts # 產品資料服務
└── public/              # 公開靜態檔案
```

## 🎯 主要功能

### 產品展示
- 首頁展示所有產品
- 產品卡片支援圖片、標題、價格顯示
- 點擊產品可查看詳細資訊

### 購物車
- 新增產品到購物車
- 查看購物車內容
- 移除購物車項目
- 即時計算總金額

### SEO 優化
- 每個頁面都有客製化的 title 和 meta description
- 伺服器端渲染確保搜尋引擎能正確索引內容

## 🚀 未來規劃

- [ ] 串接後端 API
- [ ] 使用者登入/註冊功能
- [ ] 結帳流程
- [ ] 訂單管理
- [ ] 產品搜尋與篩選
- [ ] 產品分類

## 📝 開發筆記

### 為什麼使用 Nuxt 3？

相較於純 Vue 3 + Vite，Nuxt 3 提供：
- **自動路由**：基於檔案系統的路由
- **SSR/SSG**：改善 SEO 和效能
- **自動匯入**：元件、組合式函式自動匯入
- **優化的開發體驗**：內建 TypeScript、開發工具等

### 型別檢查設定

專案使用穩定版本的 TypeScript (`~5.6.2`) 和 `vue-tsc` (`^2.1.6`) 以確保與 Nuxt 的相容性。

## 📄 授權

MIT License
