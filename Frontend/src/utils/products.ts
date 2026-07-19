import type { CategorySlug, Product } from '../types'

export function filterProducts(products: Product[], category: CategorySlug): Product[] {
  if (category === 'gold') {
    const gold = products.filter((p) => p.categorySlug === 'gold')
    const others = products.filter((p) => p.categorySlug !== 'gold')
    return [...gold, ...others]
  }
  return products.filter((p) => p.categorySlug === category)
}
