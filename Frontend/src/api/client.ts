import type { Category, GoldPrice, MarketSnapshot, Product } from '../types'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`)
  }
  return response.json() as Promise<T>
}

export async function fetchMarketSnapshot(): Promise<MarketSnapshot> {
  return getJson<MarketSnapshot>('/api/market')
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  return getJson<Product[]>(`/api/products${query}`)
}

export async function fetchCategories(): Promise<Category[]> {
  return getJson<Category[]>('/api/categories')
}

export async function fetchGoldPrices(): Promise<GoldPrice[]> {
  return getJson<GoldPrice[]>('/api/gold-prices')
}
