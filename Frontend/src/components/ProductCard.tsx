import { useEffect, useState } from 'react'
import type { Product } from '../types'

const imageMap: Record<Product['imageKey'], string> = {
  gold: '/assets/Gold.png',
  silver: '/assets/Silver.png',
  coin: '/assets/commemorative_gold.png',
}

interface ProductCardProps {
  product: Product
  featured?: boolean
  onAddToCart?: (product: Product) => void
}

function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function ProductCard({ product, featured = false, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isSilver = product.imageKey === 'silver'
  const isHighlighted = featured || hovered
  const goldLights = isHighlighted && !isSilver
  const isCoin = product.categorySlug === 'coins' || product.imageKey === 'coin'
  const imageSrc = isCoin ? imageMap.coin : imageMap[product.imageKey]

  useEffect(() => {
    setImageLoaded(false)
  }, [imageSrc])

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-[#0b1410] transition-all duration-300 ${
        isHighlighted
          ? isSilver
            ? 'card-glow-silver scale-[1.015]'
            : 'card-glow scale-[1.015]'
          : 'card-idle'
      }`}
    >
      <div
        className={`product-stage relative mx-3 mt-3 aspect-[4/5] overflow-hidden rounded-2xl ${
          goldLights ? 'product-stage--active' : ''
        }`}
      >
        <div className="product-lights" aria-hidden>
          <span className="product-lights__beam product-lights__beam--left" />
          <span className="product-lights__beam product-lights__beam--right" />
          <span className="product-lights__beam product-lights__beam--mid" />
          <span className="product-lights__beam product-lights__beam--side-l" />
          <span className="product-lights__beam product-lights__beam--side-r" />
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-[4] rounded-2xl transition-opacity duration-300 ${
            isHighlighted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: isSilver
              ? 'inset 0 0 0 1px rgba(200,210,220,0.45), inset 0 0 50px rgba(180,195,210,0.08)'
              : 'inset 0 0 0 1px rgba(201,162,39,0.4), inset 0 0 50px rgba(201,162,39,0.1)',
          }}
          aria-hidden
        />

        <div className="absolute inset-0 z-[5] flex items-center justify-center px-3 pb-11 pt-8 sm:px-4 sm:pb-12 sm:pt-9">
          <img
            src={imageSrc}
            alt={product.titleEn}
            onLoad={() => setImageLoaded(true)}
            ref={(el) => {
              if (el?.complete && el.naturalWidth > 0) setImageLoaded(true)
            }}
            className={`product-image object-contain transition-transform duration-500 ${
              imageLoaded ? 'product-image--loaded' : ''
            } ${
              product.imageKey === 'silver'
                ? 'h-[78%] w-auto max-w-[88%] drop-shadow-[0_20px_32px_rgba(0,0,0,0.55)]'
                : isCoin
                  ? 'h-[80%] w-auto max-w-[85%] drop-shadow-[0_22px_36px_rgba(0,0,0,0.7)]'
                  : 'h-[92%] w-auto max-w-[95%] scale-[1.35] drop-shadow-[0_24px_40px_rgba(0,0,0,0.8)]'
            } ${
              isHighlighted
                ? product.imageKey === 'gold' && !isCoin
                  ? 'scale-[1.42]'
                  : 'scale-105'
                : ''
            }`}
          />
        </div>

        {product.isVip && (
          <span
            className={`absolute top-3 right-3 z-20 rounded-full px-2.5 py-1 font-inter text-[10px] font-bold tracking-wider shadow-md ${
              product.imageKey === 'silver'
                ? 'bg-gradient-to-b from-[#e8e8ea] to-[#9a9aa0] text-[#1a1a1c] ring-1 ring-white/40'
                : 'bg-gradient-to-b from-[#f0d78c] to-[#c9a227] text-[#1a1408] ring-1 ring-[#ffe9a8]/50'
            }`}
          >
            VIP
          </span>
        )}

        <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center px-3">
          <span className="inline-block whitespace-nowrap rounded-full border border-emerald-900/60 bg-[#0d2a22]/90 px-3.5 py-1 font-inter text-[11px] font-medium text-emerald-100/90 shadow-lg backdrop-blur-sm">
            {product.badgeText}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-[15px] font-bold leading-snug text-white sm:text-base">
          {product.titleAr}
        </h3>
        <p className="mt-1 font-inter text-xs text-ss-muted">{product.titleEn}</p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="mb-0.5 text-[11px] text-ss-gold-muted">السعر الحالي</p>
            <p className="font-inter text-xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
              {formatPrice(product.price)}
            </p>
          </div>
          <span className="pb-1.5 font-inter text-xs font-medium text-ss-gold">EGP</span>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="btn-cart mt-4 w-full rounded-xl py-3 text-sm font-semibold text-ss-gold-light"
        >
          أضف إلى السلة
        </button>
      </div>
    </article>
  )
}
