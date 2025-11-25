import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { products, categories, productCategories } from '../server/database/schema'

// 從 productData.ts 匯入的產品資料
const productData = [
  {
    title: '極簡手錶',
    price: 129.00,
    description: '為都市專業人士打造的時尚現代腕錶，配備真皮錶帶與藍寶石水晶玻璃。',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['accessories', 'men']
  },
  {
    title: '設計師耳機',
    price: 249.00,
    description: '享受高保真音質的頂級降噪耳機，兼具舒適與時尚設計。',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['electronics', 'accessories']
  },
  {
    title: '高級太陽眼鏡',
    price: 159.00,
    description: '以手工義大利醋酸纖維製作的時尚太陽眼鏡，偏光鏡片提供極致清晰度。',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['accessories', 'summer']
  },
  {
    title: '皮革錢包',
    price: 79.00,
    description: '纖薄、耐用且優雅，植物鞣製的皮革錢包隨時間自然老化，愈發美麗。',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['accessories', 'men']
  },
  {
    title: '智慧音箱',
    price: 199.00,
    description: '為房間帶來豐富的 360 度環繞音效，支援語音控制，兼容所有智慧家庭設備。',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['electronics', 'home']
  },
  {
    title: '跑步鞋',
    price: 119.00,
    description: '為性能與舒適度打造，透氣網布鞋面與回彈緩震，適合每日跑步。',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    categorySlugs: ['clothing', 'sports']
  }
]

const categoryData = [
  { name: '電子產品', slug: 'electronics', description: '最新的科技產品' },
  { name: '配件', slug: 'accessories', description: '時尚配件' },
  { name: '服飾', slug: 'clothing', description: '流行服飾' },
  { name: '居家', slug: 'home', description: '居家生活用品' },
  { name: '運動', slug: 'sports', description: '運動健身器材' },
  { name: '男士', slug: 'men', description: '男士專區' },
  { name: '夏季', slug: 'summer', description: '夏季精選' }
]

async function seed() {
  console.log('🌱 開始匯入種子資料...')
  
  // 建立資料庫連線
  const sqlite = new Database('./data/sqlite.db')
  const db = drizzle(sqlite)
  
  try {
    // 清空現有資料
    console.log('🧹 清空現有資料...')
    await db.delete(productCategories)
    await db.delete(products)
    await db.delete(categories)
    
    // 插入分類資料
    console.log('📦 插入分類資料...')
    const insertedCategories = await db.insert(categories).values(categoryData).returning()
    const categoryMap = new Map(insertedCategories.map(c => [c.slug, c.id]))
    
    // 插入產品並建立關聯
    console.log('🛍️ 插入產品資料...')
    for (const item of productData) {
      const { categorySlugs, ...product } = item
      const [insertedProduct] = await db.insert(products).values(product).returning()
      
      if (!insertedProduct) continue

      // 建立產品與分類關聯
      if (categorySlugs && categorySlugs.length > 0) {
        const links = categorySlugs
          .map(slug => {
            const categoryId = categoryMap.get(slug)
            if (!categoryId) {
              console.warn(`⚠️ 找不到分類: ${slug}`)
              return null
            }
            return {
              productId: insertedProduct.id,
              categoryId
            }
          })
          .filter((link): link is { productId: number; categoryId: number } => link !== null)
        
        if (links.length > 0) {
          await db.insert(productCategories).values(links)
        }
      }
    }
    
    console.log('🎉 種子資料匯入完成！')
  } catch (error) {
    console.error('❌ 匯入失敗:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

seed()
