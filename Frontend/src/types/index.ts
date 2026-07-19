export type CategorySlug = 'gold' | 'silver' | 'coins'

export interface Category {
  id: number
  slug: CategorySlug
  nameAr: string
  nameEn: string
  icon: 'crown' | 'box' | 'coins'
}

export interface Product {
  id: number
  categorySlug: CategorySlug
  titleAr: string
  titleEn: string
  price: number
  badgeText: string
  imageKey: 'gold' | 'silver' | 'coin'
  isVip: boolean
  isFeatured?: boolean
}

export interface GoldPrice {
  karat: number
  labelAr: string
  price: number
  currency: string
  changeDirection: 'up' | 'down' | 'flat'
}

export interface MarketSnapshot {
  categories: Category[]
  products: Product[]
  goldPrices: GoldPrice[]
  banner: {
    titleAr: string
    subtitleAr: string
    deliveryBadgeAr: string
  }
}
