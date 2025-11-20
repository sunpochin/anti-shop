import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { products } from '../server/database/schema'

// 從 productData.ts 匯入的產品資料
const productData = [
  {
    title: '極簡手錶',
    price: 129.00,
    description: '為都市專業人士打造的時尚現代腕錶，配備真皮錶帶與藍寶石水晶玻璃。',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '設計師耳機',
    price: 249.00,
    description: '享受高保真音質的頂級降噪耳機，兼具舒適與時尚設計。',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '高級太陽眼鏡',
    price: 159.00,
    description: '以手工義大利醋酸纖維製作的時尚太陽眼鏡，偏光鏡片提供極致清晰度。',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '皮革錢包',
    price: 79.00,
    description: '纖薄、耐用且優雅，植物鞣製的皮革錢包隨時間自然老化，愈發美麗。',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '智慧音箱',
    price: 199.00,
    description: '為房間帶來豐富的 360 度環繞音效，支援語音控制，兼容所有智慧家庭設備。',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '跑步鞋',
    price: 119.00,
    description: '為性能與舒適度打造，透氣網布鞋面與回彈緩震，適合每日跑步。',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  }
]

async function seed() {
  console.log('🌱 開始匯入種子資料...')
  
  // 建立資料庫連線
  const sqlite = new Database('./data/sqlite.db')
  const db = drizzle(sqlite)
  
  try {
    // 清空現有資料
    await db.delete(products)
    console.log('✓ 清空現有資料')
    
    // 插入產品資料
    await db.insert(products).values(productData)
    console.log(`✓ 成功匯入 ${productData.length} 個產品`)
    
    console.log('🎉 種子資料匯入完成！')
  } catch (error) {
    console.error('❌ 匯入失敗:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

seed()
