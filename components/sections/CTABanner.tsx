'use client'
import { useTranslations } from 'next-intl'

export default function CTABanner() {
  const t = useTranslations('cta')

  return (
    <div className="mx-4 md:mx-10 my-16 rounded-3xl px-8 md:px-16 py-16 text-center reveal overflow-hidden relative" style={{ background: 'linear-gradient(135deg, var(--p), #6c52f0)' }} role="complementary" aria-label="Call to action">
      {/* Decorative blobs */}
      <div className="absolute w-64 h-64 rounded-full blur-[60px] opacity-20 -top-16 -left-16 bg-white pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full blur-[60px] opacity-15 -bottom-12 right-0 bg-white pointer-events-none" />

      <h2 className="text-[clamp(24px,4vw,40px)] font-black text-white mb-4 relative">{t('heading')}</h2>
      <p className="text-white/80 max-w-lg mx-auto mb-10 relative">{t('sub')}</p>
      <div className="flex items-center justify-center gap-4 flex-wrap relative">
        <a href="https://app.chabaqa.io/register"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-[var(--p)] bg-white hover:bg-[var(--p2)] transition-all shadow-[0_8px_24px_rgba(0,0,0,.15)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          {t('primary')}
        </a>
        <a href="mailto:hello@chabaqa.io"
          className="inline-flex items-center px-7 py-4 rounded-xl text-sm font-bold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all">
          {t('secondary')}
        </a>
      </div>
    </div>
  )
}
