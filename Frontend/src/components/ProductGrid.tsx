import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-ss-border bg-ss-panel/40 px-6 py-16 text-center">
        <p className="text-base text-ss-muted">لا توجد منتجات الآن</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          featured={product.isFeatured}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
