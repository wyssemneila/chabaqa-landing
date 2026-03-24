'use client'
import { useState, useMemo, useRef } from 'react'
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

// ── Unified Card (Featured + Regular share the same design) ────────────────
function ExploreCard({ item, featured = false }: { item: ExploreItem; featured?: boolean }) {
  const type = TYPE_CONFIG[item.type]

  return (
    <article
      className={`group flex flex-col bg-[var(--white)] border border-[var(--bd)] rounded-2xl overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(142,120,251,.18)] transition-all duration-300 ${featured ? 'flex-shrink-0 w-[300px] sm:w-[320px]' : 'w-full'}`}
    >
      {/* ── Banner ── */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={item.banner} alt={item.title} fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes={featured ? '320px' : '(max-width:640px) 100vw,(max-width:1024px) 50vw,320px'}
        />
        {/* Price badge only */}
        <span className={`absolute top-2.5 end-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${
          item.price === 'free'
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white'
            : 'bg-black/65 text-white'
        }`}>
          {item.price === 'free' ? 'Free' : `${item.price} ${item.currency}`}
        </span>
        {/* Verified */}
        {item.verified && (
          <span className="absolute top-2.5 start-2.5 w-6 h-6 rounded-full bg-white/92 flex items-center justify-center shadow-sm" aria-label="Verified Creator">
            <svg viewBox="0 0 24 24" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                stroke="#8e78fb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Title */}
        <h3 className="text-sm font-bold text-[var(--t1)] leading-snug line-clamp-2 group-hover:text-[var(--p)] transition-colors">
          {item.title}
        </h3>

        {/* Creator row */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-[1.5px] ring-[var(--bd)]">
            {item.creatorAvatar
              ? <Image src={item.creatorAvatar} alt={item.creator} fill className="object-cover" sizes="24px" />
              : <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-white" style={{ background: item.creatorColor }}>{item.creatorInitials}</div>
            }
          </div>
          <span className="text-[11px] text-[var(--t3)] truncate flex items-center gap-1">
            {item.creator}
            {item.verified && (
              <svg viewBox="0 0 12 12" fill="#3b82f6" width="11" height="11" className="flex-shrink-0" aria-hidden="true">
                <circle cx="6" cy="6" r="6"/>
                <path d="M3.5 6l1.7 1.7L8.5 4.3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </span>
        </div>

        {/* Stats row — type badge + members + rating */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          {/* Type badge — INSIDE card */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: type.bg, color: type.color, border: `1px solid ${type.border}` }}>
            {type.label}
          </span>

          {item.members !== undefined && (
            <span className="flex items-center gap-1 text-[11px] text-[var(--t3)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {fmt(item.members)}
            </span>
          )}
          {item.duration && (
            <span className="flex items-center gap-1 text-[11px] text-[var(--t3)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {item.duration}
            </span>
          )}
          {item.date && (
            <span className="flex items-center gap-1 text-[11px] text-[var(--t3)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {item.date}
            </span>
          )}
          {item.rating !== undefined && (
            <span className="flex items-center gap-1 text-[11px] ms-auto flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="#ff9b28" width="11" height="11" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-semibold text-[var(--t2)]">{item.rating}</span>
              {item.ratingCount && <span className="text-[var(--t3)]">({item.ratingCount})</span>}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

// ── List Row (list-view variant) ───────────────────────────────────────────
function ExploreListRow({ item }: { item: ExploreItem }) {
  const type = TYPE_CONFIG[item.type]

  return (
    <article className="group flex gap-4 bg-[var(--white)] border border-[var(--bd)] rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(142,120,251,.13)] hover:-translate-y-[2px] transition-all duration-300 p-3">
      {/* Banner */}
      <div className="relative flex-shrink-0 w-[140px] sm:w-[180px] rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image src={item.banner} alt={item.title} fill className="object-cover" sizes="180px" />
        {item.verified && (
          <span className="absolute top-2 start-2 w-5 h-5 rounded-full bg-white/92 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden="true">
              <path d="M4.5 6l1.5 1.5L8 4" stroke="#8e78fb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1z" stroke="#8e78fb" strokeWidth="1"/>
            </svg>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
        <div>
          <h3 className="text-sm font-bold text-[var(--t1)] line-clamp-1 group-hover:text-[var(--p)] transition-colors mb-1">{item.title}</h3>
          <p className="text-[11px] text-[var(--t3)] line-clamp-2 leading-relaxed">{item.desc}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {/* Creator */}
          <div className="flex items-center gap-1.5">
            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[var(--bd)]">
              {item.creatorAvatar
                ? <Image src={item.creatorAvatar} alt={item.creator} fill className="object-cover" sizes="20px" />
                : <div className="w-full h-full flex items-center justify-center text-[7px] font-black text-white" style={{ background: item.creatorColor }}>{item.creatorInitials}</div>
              }
            </div>
            <span className="text-[11px] text-[var(--t3)] font-medium">{item.creator}</span>
          </div>

          {/* Type badge */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: type.bg, color: type.color, border: `1px solid ${type.border}` }}>
            {type.label}
          </span>

          {item.members !== undefined && (
            <span className="flex items-center gap-1 text-[11px] text-[var(--t3)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
              {fmt(item.members)}
            </span>
          )}
          {item.rating !== undefined && (
            <span className="flex items-center gap-1 text-[11px]">
              <svg viewBox="0 0 24 24" fill="#ff9b28" width="10" height="10" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-semibold text-[var(--t2)]">{item.rating}</span>
            </span>
          )}

          {/* Price */}
          <span className={`ms-auto text-xs font-black flex-shrink-0 ${item.price === 'free' ? 'text-emerald-500' : 'text-[var(--t1)]'}`}>
            {item.price === 'free' ? 'Free' : `${item.price} ${item.currency}`}
          </span>
        </div>
      </div>
    </article>
  )
}

const PER_PAGE = 12

// ── Main ───────────────────────────────────────────────────────────────────
export default function ExploreClient() {
  const t = useTranslations('explore')

  // ── Filter state ──
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeTypes,    setActiveTypes]    = useState<ContentType[]>([])
  const [sort,           setSort]           = useState('popular')
  const [freeOnly,       setFreeOnly]       = useState(false)
  const [viewMode,       setViewMode]       = useState<'grid' | 'list'>('grid')
  const [page,           setPage]           = useState(1)

  // ── Featured scroll ──
  const featuredRef = useRef<HTMLDivElement>(null)
  function scrollFeatured(dir: 1 | -1) {
    if (!featuredRef.current) return
    featuredRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  const toggleType = (type: ContentType) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type])
    setPage(1)
  }

  const clearFilters = () => {
    setSearch(''); setActiveCategory('all'); setActiveTypes([]); setFreeOnly(false); setPage(1)
  }

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

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const hasFilters  = search || activeCategory !== 'all' || activeTypes.length > 0 || freeOnly

  const CATEGORY_LABELS: Record<string, string> = {
    all: t('catAll'), fitness: t('catFitness'), education: t('catEducation'),
    technology: t('catTechnology'), business: t('catBusiness'), creative: t('catCreative'), language: t('catLanguage'),
  }
  const TYPE_LABELS: Record<ContentType, string> = {
    community: t('typeCommunity'), course: t('typeCourse'), challenge: t('typeChallenge'),
    product: t('typeProduct'), session: t('typeSession'), event: t('typeEvent'),
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — Hero + Featured Communities
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-12 overflow-hidden" aria-label={t('heroLabel')}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)' }} />
        <div className="absolute w-[500px] h-[320px] rounded-full blur-[80px] opacity-[0.10] -top-16 -left-24 bg-[var(--p)] pointer-events-none" aria-hidden="true" />
        <div className="absolute w-[320px] h-[320px] rounded-full blur-[80px] opacity-[0.08] top-8 -right-16 bg-[var(--cyan)] pointer-events-none" aria-hidden="true" />

        {/* Headline */}
        <div className="relative px-6 md:px-10 max-w-6xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5"
            style={{ background: 'var(--p2)', border: '1.5px solid var(--p3)', color: 'var(--p)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            {t('badge')}
          </div>
          <h1 className="text-[clamp(32px,5vw,58px)] font-black text-[var(--t1)] leading-[1.05] tracking-[-0.03em] mb-3 max-w-2xl">
            {t('heroTitle1')}{' '}
            <span className="text-[var(--p)]">{t('heroTitle2')}</span>
          </h1>
          <p className="text-[var(--t3)] text-[clamp(14px,2vw,17px)] leading-relaxed max-w-xl">
            {t('heroSub')}
          </p>
        </div>

        {/* Featured Communities */}
        <div className="relative px-6 md:px-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[.12em] text-[var(--p)] mb-0.5">{t('featuredEyebrow')}</div>
              <h2 className="text-lg font-black text-[var(--t1)]">{t('featuredTitle')}</h2>
            </div>
            {/* Scroll arrows */}
            <div className="flex items-center gap-2">
              <button onClick={() => scrollFeatured(-1)} aria-label="Previous communities"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)] hover:border-[var(--p3)] hover:bg-[var(--p2)] transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={() => scrollFeatured(1)} aria-label="Next communities"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)] hover:border-[var(--p3)] hover:bg-[var(--p2)] transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Horizontal scroll track */}
          <div ref={featuredRef} className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {FEATURED_COMMUNITIES.map(item => (
              <ExploreCard key={item.id} item={item} featured />
            ))}
            {/* Ghost card — "See all" */}
            <a href={`${APP_URL}/explore`}
              className="flex-shrink-0 w-[180px] sm:w-[200px] rounded-2xl border border-dashed border-[var(--p3)] bg-[var(--p2)] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[var(--p)] group transition-all">
              <div className="w-10 h-10 rounded-xl bg-[var(--p)] group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--p)] group-hover:text-white transition-colors text-center px-4">{t('seeAll')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — Search + Filters + Content Grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pb-16 px-6 md:px-10" aria-label={t('gridLabel')}>
        <div className="max-w-6xl mx-auto">

          {/* ── Unified search + filter block ── */}
          <div className="bg-[var(--white)] border border-[var(--bd)] rounded-2xl p-4 mb-6 shadow-[0_2px_16px_rgba(142,120,251,.07)] space-y-3">

            {/* Row 1: Search + Sort + Free toggle */}
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <input
                  type="search" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder={t('searchPlaceholder')} aria-label={t('searchLabel')}
                  className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--bd)] focus:border-[var(--p)] focus:outline-none text-[var(--t1)] placeholder:text-[var(--t3)] text-sm transition-colors"
                />
                {search && (
                  <button onClick={() => { setSearch(''); setPage(1) }} aria-label={t('clearSearch')}
                    className="absolute inset-y-0 end-3 flex items-center text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Free toggle */}
              <button onClick={() => { setFreeOnly(!freeOnly); setPage(1) }} aria-pressed={freeOnly}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  freeOnly ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-[var(--bg)] text-[var(--t2)] border-[var(--bd)] hover:border-emerald-400 hover:text-emerald-600'
                }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                {t('freeOnly')}
              </button>

              {/* Sort */}
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}
                aria-label={t('sortLabel')}
                className="flex-shrink-0 text-sm font-semibold text-[var(--t2)] bg-[var(--bg)] border border-[var(--bd)] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--p)] cursor-pointer hover:border-[var(--p3)] transition-colors">
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Row 2: Category pills */}
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }} role="group" aria-label={t('categoryLabel')}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1) }}
                  aria-pressed={activeCategory === cat}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[var(--p)] text-white border-[var(--p)]'
                      : 'bg-[var(--bg)] text-[var(--t2)] border-[var(--bd)] hover:border-[var(--p3)] hover:text-[var(--p)]'
                  }`}>
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Row 3: Type chips */}
            <div className="flex gap-2 overflow-x-auto flex-wrap" style={{ scrollbarWidth: 'none' }} role="group" aria-label={t('typeLabel')}>
              {CONTENT_TYPES.map(type => {
                const cfg    = TYPE_CONFIG[type]
                const active = activeTypes.includes(type)
                return (
                  <button key={type} onClick={() => toggleType(type)} aria-pressed={active}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={active
                      ? { background: cfg.color, color: '#fff', borderColor: cfg.color }
                      : { background: 'var(--bg)', color: cfg.color, borderColor: cfg.border }
                    }>
                    {TYPE_LABELS[type]}
                  </button>
                )
              })}

              {hasFilters && (
                <button onClick={clearFilters}
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--t3)] border border-[var(--bd)] hover:text-red-500 hover:border-red-300 transition-all ms-auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="11" height="11" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {t('clearAll')}
                </button>
              )}
            </div>
          </div>

          {/* ── Toolbar: result count + view toggle ── */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[var(--t3)]">
              <span className="font-bold text-[var(--t1)]">{filtered.length}</span>
              {' '}{t('resultsOf')}{' '}
              <span className="font-bold text-[var(--t1)]">{EXPLORE_ITEMS.length}</span>
              {' '}{t('results')}
            </p>

            {/* View toggle */}
            <div className="flex items-center border border-[var(--bd)] rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} aria-label="Grid view"
                className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--p)] text-white' : 'bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)]'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button onClick={() => setViewMode('list')} aria-pressed={viewMode === 'list'} aria-label="List view"
                className={`px-3 py-2 transition-colors border-s border-[var(--bd)] ${viewMode === 'list' ? 'bg-[var(--p)] text-white' : 'bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)]'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          {paginated.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginated.map(item => <ExploreCard key={item.id} item={item} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginated.map(item => <ExploreListRow key={item.id} item={item} />)}
                </div>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-10" role="navigation" aria-label="Pagination">
                  {/* Prev */}
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    aria-label="Previous page"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)] hover:border-[var(--p3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                    const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1
                    const gap  = n > 1 && Math.abs(n - (n > page ? n - 1 : n + 1)) > 1
                    if (!show) return null
                    return (
                      <button key={n} onClick={() => setPage(n)}
                        aria-current={page === n ? 'page' : undefined}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold border transition-all ${
                          page === n
                            ? 'bg-[var(--p)] text-white border-[var(--p)]'
                            : 'bg-[var(--white)] text-[var(--t2)] border-[var(--bd)] hover:border-[var(--p3)] hover:text-[var(--p)]'
                        }`}>
                        {n}
                      </button>
                    )
                  })}

                  {/* Next */}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    aria-label="Next page"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t3)] hover:text-[var(--p)] hover:border-[var(--p3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--p2)] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[var(--t1)] mb-2">{t('noResults')}</h3>
              <p className="text-sm text-[var(--t3)] max-w-xs mb-5">{t('noResultsSub')}</p>
              <button onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--p)] hover:bg-[#7a64f0] transition-colors">
                {t('clearAll')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — Motivational Promo
      ════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 pb-20" aria-label={t('promoLabel')}>
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-14 text-center" style={{ background: 'linear-gradient(135deg, var(--p) 0%, var(--p-dark) 100%)' }}>
            {/* Decoration */}
            <div className="absolute w-72 h-72 rounded-full blur-[70px] opacity-20 -top-20 -left-16 bg-white pointer-events-none" aria-hidden="true" />
            <div className="absolute w-56 h-56 rounded-full blur-[70px] opacity-15 -bottom-12 right-4 bg-white pointer-events-none" aria-hidden="true" />
            {/* Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 pointer-events-none" aria-hidden="true" />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5 bg-white/15 text-white border border-white/25">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {t('promoBadge')}
              </div>

              <h2 className="text-[clamp(24px,4vw,42px)] font-black text-white leading-[1.1] tracking-[-0.02em] mb-4 max-w-2xl mx-auto">
                {t('promoTitle')}
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-10 leading-relaxed">
                {t('promoSub')}
              </p>

              {/* Feature pills */}
              <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
                {[
                  { icon: '👥', label: t('promoF1') },
                  { icon: '🎓', label: t('promoF2') },
                  { icon: '💸', label: t('promoF3') },
                  { icon: '🏆', label: t('promoF4') },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                    <span aria-hidden="true">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-[var(--p)] bg-white hover:bg-[var(--p2)] transition-all shadow-[0_8px_24px_rgba(0,0,0,.15)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                  {t('promoCTA')}
                </a>
                <a href={`${APP_URL}/explore`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all">
                  {t('promoSecondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
