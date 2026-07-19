import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { fetchMarketSnapshot } from './api/client'
import { HeaderBanner } from './components/HeaderBanner'
import { ProductGrid } from './components/ProductGrid'
import { Sidebar } from './components/Sidebar'
import type { CategorySlug, MarketSnapshot, Product } from './types'
import { filterProducts } from './utils/products'

const emptySnapshot: MarketSnapshot = {
  banner: {
    titleAr: '',
    subtitleAr: '',
    deliveryBadgeAr: '',
  },
  categories: [],
  products: [],
  goldPrices: [],
}

export default function App() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot>(emptySnapshot)
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('gold')
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchMarketSnapshot()
        if (!cancelled) {
          setSnapshot(data)
          if (data.categories.length > 0) {
            setActiveCategory(data.categories[0].slug)
          }
        }
      } catch {
        if (!cancelled) {
          setSnapshot(emptySnapshot)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toast])

  const products = filterProducts(snapshot.products, activeCategory)

  function handleAddToCart(product: Product) {
    setCartCount((c) => c + 1)
    setToast(`تمت إضافة «${product.titleAr}» إلى السلة`)
  }

  function handleSelectCategory(slug: CategorySlug) {
    setActiveCategory(slug)
    setMobileOpen(false)
  }

  return (
    <div className="app-shell min-h-screen" dir="rtl">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-4 p-3 sm:p-5 lg:flex-row lg:gap-5 lg:p-6">
        <div className="hidden lg:block">
          <Sidebar
            categories={snapshot.categories}
            goldPrices={snapshot.goldPrices}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            className="sticky top-6 min-h-[calc(100vh-3rem)]"
          />
        </div>

        <main className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-ss-border/60 bg-ss-panel/80 px-4 py-3 backdrop-blur-md lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-ss-border text-ss-gold-light"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-ss-gold/40 bg-[#1a2e26]">
                <span className="font-inter text-sm font-bold text-ss-gold">S</span>
              </div>
              <span className="font-inter text-sm font-semibold text-white">Stock Squares</span>
            </div>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-ss-border text-ss-gold-light"
              aria-label="السلة"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -start-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ss-gold px-1 font-inter text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {snapshot.banner.titleAr && (
            <HeaderBanner
              titleAr={snapshot.banner.titleAr}
              subtitleAr={snapshot.banner.subtitleAr}
              deliveryBadgeAr={snapshot.banner.deliveryBadgeAr}
            />
          )}

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-ss-border/50 bg-ss-panel/40 px-6 py-16">
              <p className="text-ss-muted">جاري تحميل المنتجات…</p>
            </div>
          ) : (
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          )}
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="drawer-overlay absolute inset-0"
            aria-label="إغلاق"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-[min(100%,320px)] animate-[slideIn_0.25s_ease] p-3">
            <div className="relative h-full w-full overflow-y-auto">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 start-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-ss-border bg-ss-surface text-white"
                aria-label="إغلاق القائمة"
              >
                <X className="h-4 w-4" />
              </button>
              <Sidebar
                categories={snapshot.categories}
                goldPrices={snapshot.goldPrices}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 start-1/2 z-50 -translate-x-1/2 rounded-xl border border-ss-gold/40 bg-ss-panel px-5 py-3 text-sm text-ss-gold-light shadow-2xl">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0.6; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
