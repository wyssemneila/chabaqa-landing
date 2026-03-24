'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  EXPLORE_ITEMS, FEATURED_COMMUNITIES, CATEGORIES, CONTENT_TYPES,
  TYPE_CONFIG, SORT_OPTIONS,
  type ContentType, type ExploreItem,
} from '@/lib/explore-data'
import { APP_URL } from '@/lib/config'

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `${n}`
}

// ── Featured Card ──────────────────────────────────────────────────────────
function FeaturedCard({ item }: { item: ExploreItem }) {
  return (
    <a href={`${APP_URL}/community/${item.id}`} aria-label={`Join ${item.title}`}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden cursor-pointer border border-[var(--bd)] hover:shadow-[0_16px_48px_rgba(142,120,251,.2)] hover:-translate-y-1 transition-all duration-300">

      {/* Banner */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image src={item.banner} alt={item.title} fill className="object-cover" sizes="320px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Verified */}
        {item.verified && (
          <div className="absolute top-3 end-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
            aria-label="Verified">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                stroke="#8e78fb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-4">
          <h3 className="text-white font-black text-[18px] leading-tight mb-1 drop-shadow">{item.title}</h3>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[var(--white)] px-4 py-3 flex items-center justify-between gap-3">
        {/* Creator */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--bd)]">
            {item.creatorAvatar
              ? <Image src={item.creatorAvatar} alt={item.creator} fill className="object-cover" sizes="28px" />
              : <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: item.creatorColor }}>{item.creatorInitials}</div>
            }
          </div>
          <span className="text-xs text-[var(--t3)] font-medium truncate">{item.creator}</span>
        </div>

        {/* Members + type */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {item.members !== undefined && (
            <span className="flex items-center gap-1 text-[11px] text-[var(--t3)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {fmt(item.members)}
            </span>
          )}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: TYPE_CONFIG.community.bg, color: TYPE_CONFIG.community.color, border: `1px solid ${TYPE_CONFIG.community.border}` }}>
            Community
          </span>
        </div>
      </div>
    </a>
  )
}

// ── Small Card ─────────────────────────────────────────────────────────────
function ExploreCard({ item }: { item: ExploreItem }) {
  const type = TYPE_CONFIG[item.type]

  return (
    <a href={`${APP_URL}/explore`} aria-label={item.title}
      className="group flex flex-col bg-[var(--white)] border border-[var(--bd)] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(142,120,251,.15)] transition-all duration-300">

      {/* Banner */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image src={item.banner} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />

        {/* Type badge */}
        <span className="absolute top-2.5 start-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.92)', color: type.color, border: `1px solid ${type.border}` }}>
          {type.label}
        </span>

        {/* Price badge */}
        <span className={`absolute top-2.5 end-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          item.price === 'free'
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white'
            : 'bg-black/60 text-white'
        }`}>
          {item.price === 'free' ? 'Free' : `${item.price} ${item.currency}`}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3">

        {/* Title */}
        <h3 className="text-sm font-bold text-[var(--t1)] leading-snug mb-2 line-clamp-2 group-hover:text-[var(--p)] transition-colors">
          {item.title}
        </h3>

        {/* Creator */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[var(--bd)]">
            {item.creatorAvatar
              ? <Image src={item.creatorAvatar} alt={item.creator} fill className="object-cover" sizes="20px" />
              : <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-white" style={{ background: item.creatorColor }}>{item.creatorInitials}</div>
            }
          </div>
          <span className="text-[11px] text-[var(--t3)] truncate">
            {item.creator}
            {item.verified && (
              <svg className="inline-block ms-1 -mt-px" viewBox="0 0 16 16" fill="#3b82f6" width="11" height="11" aria-label="Verified">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.25 5.27-3.75 4.5a.75.75 0 0 1-1.1.07l-1.75-1.75a.75.75 0 1 1 1.06-1.06l1.19 1.19 3.2-3.84a.75.75 0 0 1 1.15.89z"/>
              </svg>
            )}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2.5 text-[11px] text-[var(--t3)] mt-auto">
          {item.members !== undefined && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {fmt(item.members)}
            </span>
          )}
          {item.duration && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {item.duration}
            </span>
          )}
          {item.date && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {item.date}
            </span>
          )}
          {item.rating !== undefined && (
            <span className="flex items-center gap-1 ms-auto">
              <svg viewBox="0 0 24 24" fill="#ff9b28" width="11" height="11" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-semibold text-[var(--t2)]">{item.rating}</span>
              <span>({item.ratingCount})</span>
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function ExploreClient() {
  const t = useTranslations('explore')

  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeTypes,    setActiveTypes]    = useState<ContentType[]>([])
  const [sort,           setSort]           = useState('popular')
  const [freeOnly,       setFreeOnly]       = useState(false)

  const toggleType = (type: ContentType) =>
    setActiveTypes(prev => prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type])

  const filtered = useMemo(() => {
    let items = [...EXPLORE_ITEMS]
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q)  ||
        i.creator.toLowerCase().includes(q)
      )
    }
    if (activeCategory !== 'all')   items = items.filter(i => i.category === activeCategory)
    if (activeTypes.length > 0)     items = items.filter(i => activeTypes.includes(i.type))
    if (freeOnly)                   items = items.filter(i => i.price === 'free')
    if (sort === 'rating')          items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    else if (sort === 'price-low')  items.sort((a, b) => (a.price === 'free' ? 0 : +a.price) - (b.price === 'free' ? 0 : +b.price))
    else if (sort === 'price-high') items.sort((a, b) => (b.price === 'free' ? 0 : +b.price) - (a.price === 'free' ? 0 : +a.price))
    else if (sort === 'popular')    items.sort((a, b) => (b.members ?? 0) - (a.members ?? 0))
    return items
  }, [search, activeCategory, activeTypes, sort, freeOnly])

  const CATEGORY_LABELS: Record<string, string> = {
    all:        t('catAll'),
    fitness:    t('catFitness'),
    education:  t('catEducation'),
    technology: t('catTechnology'),
    business:   t('catBusiness'),
    creative:   t('catCreative'),
    language:   t('catLanguage'),
  }

  const TYPE_LABELS: Record<ContentType, string> = {
    community: t('typeCommunity'),
    course:    t('typeCourse'),
    challenge: t('typeChallenge'),
    product:   t('typeProduct'),
    session:   t('typeSession'),
    event:     t('typeEvent'),
  }

  const SORT_LABELS: Record<string, string> = {
    popular:    t('sortPopular'),
    newest:     t('sortNewest'),
    rating:     t('sortRating'),
    'price-low':  t('sortPriceLow'),
    'price-high': t('sortPriceHigh'),
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-6 md:px-10 overflow-hidden text-center" aria-label={t('heroLabel')}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)' }} />
        <div className="absolute w-[380px] h-[380px] rounded-full blur-[80px] opacity-[0.13] -top-20 -left-16 bg-[var(--p)] pointer-events-none" aria-hidden="true" />
        <div className="absolute w-[280px] h-[280px] rounded-full blur-[80px] opacity-[0.1] top-10 -right-16 bg-[var(--cyan)] pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6"
            style={{ background: 'var(--p2)', border: '1.5px solid var(--p3)', color: 'var(--p)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            {t('badge')}
          </div>

          <h1 className="text-[clamp(32px,5vw,62px)] font-black text-[var(--t1)] leading-[1.05] tracking-[-0.03em] mb-4">
            {t('heroTitle1')}<br />
            <span className="text-[var(--p)]">{t('heroTitle2')}</span>
          </h1>
          <p className="text-[var(--t3)] text-[clamp(14px,2vw,17px)] leading-relaxed max-w-lg mx-auto mb-8">
            {t('heroSub')}
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchLabel')}
              className="w-full ps-11 pe-12 py-4 rounded-2xl bg-[var(--white)] border-2 border-[var(--bd)] focus:border-[var(--p)] focus:outline-none text-[var(--t1)] placeholder:text-[var(--t3)] text-[15px] shadow-[0_4px_24px_rgba(142,120,251,.08)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label={t('clearSearch')}
                className="absolute inset-y-0 end-4 flex items-center text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Featured Communities ───────────────────────────────────────────── */}
      {!search && activeCategory === 'all' && activeTypes.length === 0 && !freeOnly && (
        <section className="pb-10 px-6 md:px-10" aria-label={t('featuredLabel')}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-[.1em] text-[var(--p)] mb-1">{t('featuredEyebrow')}</div>
                <h2 className="text-xl font-black text-[var(--t1)]">{t('featuredTitle')}</h2>
              </div>
              <a href={`${APP_URL}/explore`} className="text-xs font-bold text-[var(--p)] hover:underline hidden sm:block">
                {t('seeAll')} →
              </a>
            </div>

            {/* Horizontal scroll row */}
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {FEATURED_COMMUNITIES.map(item => (
                <FeaturedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Filters (sticky) ──────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--bd)]"
        role="search" aria-label={t('filtersLabel')}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 space-y-2.5">

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="group" aria-label={t('categoryLabel')}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[var(--p)] text-white border-[var(--p)]'
                    : 'bg-[var(--white)] text-[var(--t2)] border-[var(--bd)] hover:border-[var(--p3)] hover:text-[var(--p)]'
                }`}>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Type chips + sort + free toggle */}
          <div className="flex items-center gap-2 overflow-x-auto flex-wrap" style={{ scrollbarWidth: 'none' }}
            role="group" aria-label={t('typeLabel')}>

            {/* Type chips */}
            {CONTENT_TYPES.map(type => {
              const cfg  = TYPE_CONFIG[type]
              const active = activeTypes.includes(type)
              return (
                <button key={type} onClick={() => toggleType(type)}
                  aria-pressed={active}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={active ? { background: cfg.color, color: '#fff', borderColor: cfg.color } : { background: 'var(--white)', color: cfg.color, borderColor: cfg.border }}>
                  {TYPE_LABELS[type]}
                </button>
              )
            })}

            <div className="ms-auto flex items-center gap-2 flex-shrink-0">
              {/* Free toggle */}
              <button onClick={() => setFreeOnly(!freeOnly)}
                aria-pressed={freeOnly}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  freeOnly ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-[var(--white)] text-[var(--t2)] border-[var(--bd)] hover:border-emerald-400 hover:text-emerald-600'
                }`}>
                {t('freeOnly')}
              </button>

              {/* Sort */}
              <select value={sort} onChange={e => setSort(e.target.value)}
                aria-label={t('sortLabel')}
                className="text-xs font-semibold text-[var(--t2)] bg-[var(--white)] border border-[var(--bd)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--p)] cursor-pointer hover:border-[var(--p3)] transition-colors">
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{SORT_LABELS[opt.value]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Grid ──────────────────────────────────────────────────── */}
      <section className="py-8 px-6 md:px-10" aria-label={t('gridLabel')}>
        <div className="max-w-6xl mx-auto">

          {/* Result count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-[var(--t3)]">
              <span className="font-bold text-[var(--t1)]">{filtered.length}</span> {t('resultsOf')} {EXPLORE_ITEMS.length} {t('results')}
            </p>
            {(activeTypes.length > 0 || activeCategory !== 'all' || freeOnly || search) && (
              <button onClick={() => { setSearch(''); setActiveCategory('all'); setActiveTypes([]); setFreeOnly(false) }}
                className="text-xs font-semibold text-[var(--p)] hover:underline">
                {t('clearAll')}
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item => <ExploreCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--p2)] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[var(--t1)] mb-2">{t('noResults')}</h3>
              <p className="text-sm text-[var(--t3)] max-w-xs">{t('noResultsSub')}</p>
              <button onClick={() => { setSearch(''); setActiveCategory('all'); setActiveTypes([]); setFreeOnly(false) }}
                className="mt-5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--p)] hover:bg-[#7a64f0] transition-colors">
                {t('clearAll')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
