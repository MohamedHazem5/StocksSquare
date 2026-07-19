import { Box, Coins, Crown } from 'lucide-react'
import type { Category, CategorySlug, GoldPrice } from '../types'

const iconMap = {
  crown: Crown,
  box: Box,
  coins: Coins,
} as const

interface SidebarProps {
  categories: Category[]
  goldPrices: GoldPrice[]
  activeCategory: CategorySlug
  onSelectCategory: (slug: CategorySlug) => void
  className?: string
}

function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function Sidebar({
  categories,
  goldPrices,
  activeCategory,
  onSelectCategory,
  className = '',
}: SidebarProps) {
  return (
    <aside
      className={`flex h-full w-full flex-col gap-8 rounded-3xl border border-ss-border/60 bg-ss-panel/80 p-5 backdrop-blur-md lg:w-[280px] lg:shrink-0 xl:w-[300px] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ss-gold/40 bg-gradient-to-br from-[#1a2e26] to-[#0a1410] shadow-[0_0_16px_rgba(201,162,39,0.2)]">
          <span className="font-inter text-xl font-bold text-ss-gold-light">S</span>
        </div>
        <div className="leading-tight">
          <p className="font-inter text-[15px] font-semibold tracking-wide text-white">
            Stock Squares
          </p>
          <p className="text-[11px] text-ss-muted">Precious Metals</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ss-muted">التصنيفات</h2>
        <nav className="flex flex-col gap-1.5">
          {categories.map((category) => {
            const Icon = iconMap[category.icon]
            const isActive = category.slug === activeCategory
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-right transition-all duration-200 ${
                  isActive
                    ? 'nav-active text-ss-gold-light'
                    : 'text-ss-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 ${
                    isActive ? 'text-ss-gold' : 'text-ss-muted'
                  }`}
                  strokeWidth={1.75}
                />
                <span className="text-[15px] font-medium">{category.nameAr}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-ss-border/80 bg-gradient-to-b from-[#0f1c17] to-[#0a1210] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-ss-gold"
              aria-hidden
            >
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 7H21V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-sm font-semibold text-white">أسعار الذهب المباشرة</h3>
          </div>
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-ss-live shadow-[0_0_8px_#ef4444]" />
        </div>

        <ul className="flex flex-col gap-3">
          {goldPrices.map((item) => (
            <li
              key={item.karat}
              className="flex items-center justify-between gap-2 border-b border-ss-border/40 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-ss-muted">{item.labelAr}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-inter text-sm font-semibold text-ss-gold-light">
                  {item.currency} {formatPrice(item.price)}
                </span>
                {item.changeDirection === 'up' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-emerald-400" aria-hidden>
                    <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
                  </svg>
                )}
                {item.changeDirection === 'down' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-red-400" aria-hidden>
                    <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
