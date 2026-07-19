import { Truck } from 'lucide-react'

interface HeaderBannerProps {
  titleAr: string
  subtitleAr: string
  deliveryBadgeAr: string
}

export function HeaderBanner({ titleAr, subtitleAr, deliveryBadgeAr }: HeaderBannerProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-ss-border/50 bg-gradient-to-l from-[#0f241c] via-[#0c1a15] to-[#0a1511] px-5 py-5 sm:px-7 sm:py-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 85% 50%, rgba(201,162,39,0.12), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-xl font-bold leading-snug text-ss-gold-light sm:text-2xl lg:text-[1.65rem]">
            {titleAr}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-[15px]">
            {subtitleAr}
          </p>
        </div>

        <div className="shrink-0 self-start lg:self-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-ss-teal-bright/40 bg-ss-teal/80 px-4 py-2.5 text-sm text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Truck className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2} />
            <span className="font-medium whitespace-nowrap">{deliveryBadgeAr}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
