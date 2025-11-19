export interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Minimalist Watch',
    price: 129.00,
    description: 'A sleek and modern timepiece for the urban professional. Features a genuine leather strap and sapphire crystal glass.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Designer Headphones',
    price: 249.00,
    description: 'Immerse yourself in high-fidelity sound with these premium noise-cancelling headphones. Designed for comfort and style.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Premium Sunglasses',
    price: 159.00,
    description: 'Protect your eyes in style with these handcrafted Italian acetate sunglasses. Polarized lenses for ultimate clarity.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Leather Wallet',
    price: 79.00,
    description: 'Slim, durable, and elegant. This vegetable-tanned leather wallet ages beautifully over time.',
    image: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Smart Speaker',
    price: 199.00,
    description: 'Fill your room with rich, 360-degree sound. Voice-controlled and compatible with all your smart home devices.',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Running Shoes',
    price: 119.00,
    description: 'Engineered for performance and comfort. Breathable mesh upper and responsive cushioning for your daily run.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  }
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: number | string): Product | undefined {
  return products.find(p => p.id === Number(id))
}
