'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { PLANS } from '@/lib/data'

export default function Pricing() {
  const t      = useTranslations('pricing')
  const plans  = t.raw('plans') as { badge: string; name: string; desc: string; fee: string; features: string[] }[]
  const period = t.raw('period') as { free: string; monthly: string; yearly: string }
  const [yearly, setYearly] = useState(false)

  return (
    <section className="py-24 px-6 md:px-10 bg-[var(--white)]" id="pricing" aria-label="Pricing plans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 section-center reveal">
          <div className="text-xs font-bold uppercase tracking-[.1em] text-[var(--p)] mb-3">{t('eyebrow')}</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-black text-[var(--t1)] mb-4">{t('title')}</h2>
          <p className="text-[var(--t3)] max-w-xl mx-auto mb-8">{t('sub')}</p>
          <div className="inline-flex rounded-xl border border-[var(--bd)] bg-[var(--bg)] p-1 gap-1" role="group" aria-label="Billing period">
            <button onClick={() => setYearly(false)} aria-pressed={!yearly}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${!yearly ? 'bg-[var(--p)] text-white shadow-sm' : 'text-[var(--t2)] hover:bg-[var(--p2)]'}`}>
              {t('monthly')}
            </button>
            <button onClick={() => setYearly(true)} aria-pressed={yearly}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${yearly ? 'bg-[var(--p)] text-white shadow-sm' : 'text-[var(--t2)] hover:bg-[var(--p2)]'}`}>
              {t('yearly')}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--cyan)] text-white">{t('save')}</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {PLANS.map((plan, i) => {
            const tPlan        = plans[i]
            const displayPrice = yearly ? plan.yearlyPrice : plan.monthlyPrice
            const isFree       = displayPrice === 0
            const priceLabel   = isFree ? '0' : `${displayPrice}`
            const periodLabel  = isFree ? period.free : yearly ? period.yearly : period.monthly

            return (
              <div key={plan.name} className={`relative rounded-2xl p-7 flex flex-col border transition-shadow ${
                plan.featured
                  ? 'bg-[var(--p)] border-[var(--p)] shadow-[0_20px_60px_rgba(142,120,251,.4)]'
                  : 'bg-[var(--white)] border-[var(--bd)] hover:shadow-[0_8px_32px_rgba(142,120,251,.12)]'
              }`}>
                <div className={`inline-flex self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${plan.featured ? 'bg-white/20 text-white' : 'bg-[var(--p2)] text-[var(--p)]'}`}>
                  {tPlan.badge}
                </div>
                <div className={`text-xl font-black mb-1 ${plan.featured ? 'text-white' : 'text-[var(--t1)]'}`}>{tPlan.name}</div>
                <div className={`text-sm mb-5 ${plan.featured ? 'text-white/80' : 'text-[var(--t3)]'}`}>{tPlan.desc}</div>

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-[42px] font-black leading-none ${plan.featured ? 'text-white' : 'text-[var(--t1)]'}`}>
                    {isFree ? t('ctaFree').split(' ')[0] : priceLabel}
                  </span>
                  {!isFree && <span className={`text-sm mb-2 ${plan.featured ? 'text-white/70' : 'text-[var(--t3)]'}`}>TND</span>}
                </div>
                <div className={`text-xs mb-1 ${plan.featured ? 'text-white/70' : 'text-[var(--t3)]'}`}>{periodLabel}</div>
                {yearly && !isFree && (
                  <div className={`text-xs line-through mb-2 ${plan.featured ? 'text-white/50' : 'text-[var(--t3)]'}`}>{plan.monthlyPrice} TND</div>
                )}
                <div className={`text-xs font-semibold mb-6 ${plan.featured ? 'text-white/80' : 'text-[var(--p)]'}`}>{tPlan.fee}</div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tPlan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? 'bg-white/20' : 'bg-[var(--p2)]'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={plan.featured ? '#fff' : 'var(--p)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="9" height="9" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className={plan.featured ? 'text-white/90' : 'text-[var(--t2)]'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="https://app.chabaqa.io/register"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.featured
                      ? 'bg-white text-[var(--p)] hover:bg-[var(--p2)]'
                      : 'bg-[var(--p)] text-white hover:bg-[#7a64f0]'
                  }`}>
                  {isFree ? t('ctaFree') : t('ctaTrial')}
                  {plan.featured && ' →'}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
