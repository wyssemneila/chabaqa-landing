'use client'
import { useState, useMemo } from 'react'
import {
  EXPLORE_ITEMS, CATEGORIES, CATEGORY_LABELS, CONTENT_TYPES,
  TYPE_CONFIG, TYPE_LABELS, SORT_OPTIONS,
  type ContentType, type ExploreItem,
} from '@/lib/explore-data'
import { APP_URL } from '@/lib/config'

// ── Helpers ───────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `${n}`
}

// ── Card ──────────────────────────────────────────────────────────────────
function ExploreCard({ item }: { item: ExploreItem }) {
  const type = TYPE_CONFIG[item.type]
  const cta  = { community: 'Join', course: 'Enroll', challenge: 'Join', product: 'Buy', session: 'Book', event: 'Register' }[item.type]

  return (
    <article className="group flex flex-col bg-[var(--white)] border border-[var(--bd)] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(142,120,251,.15)] transition-all duration-300">

      {/* Cover */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9', background: item.coverGradient }}>

        {/* Type badge */}
        <span className="absolute top-3 start-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.93)', color: type.color, border: `1px solid ${type.border}` }}>
          {type.label}
        </span>

        {/* Verified shield */}
        {item.verified && (
          <span className="absolute top-3 end-3 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.93)' }} title="Verified Creator" aria-label="Verified Creator">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                stroke="var(--p)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">

        {/* Creator */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white"
            style={{ background: item.creatorColor }} aria-hidden="true">
            {item.creatorInitials}
          </div>
          <span className="text-xs text-[var(--t3)] font-medium truncate">{item.creator}</span>
        </div>

        {/* Title + desc */}
        <h3 className="text-sm font-bold text-[var(--t1)] leading-snug mb-1.5 line-clamp-2">{item.title}</h3>
        <p className="text-xs text-[var(--t3)] leading-relaxed line-clamp-2 flex-1 mb-4">{item.desc}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[var(--t3)] mb-4 flex-wrap">
          {item.members !== undefined && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {fmt(item.members)}
            </span>
          )}
          {item.duration && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {item.duration}
            </span>
          )}
          {item.date && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {item.date}
            </span>
          )}
          {item.rating !== undefined && (
            <span className="flex items-center gap-1 ms-auto">
              <svg viewBox="0 0 24 24" fill="var(--orange)" width="12" height="12" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-semibold text-[var(--t2)]">{item.rating}</span>
              <span className="text-[var(--t3)]">({item.ratingCount})</span>
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--bd)]">
          <div>
            {item.price === 'free'
              ? <span className="text-sm font-black text-[var(--p)]">Free</span>
              : <span className="text-sm font-black text-[var(--t1)]">{item.price} <span className="text-xs font-semibold text-[var(--t3)]">{item.currency}</span></span>
            }
          </div>
          <a href={`${APP_URL}/explore`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[var(--p)] hover:bg-[#7a64f0] transition-colors">
            {cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function ExploreClient() {
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeTypes,    setActiveTypes]    = useState<ContentType[]>([])
  const [sort,           setSort]           = useState('popular')
  const [verifiedOnly,   setVerifiedOnly]   = useState(false)
  const [freeOnly,       setFreeOnly]       = useState(false)

  const toggleType = (t: ContentType) =>
    setActiveTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const clearFilters = () => {
    setSearch(''); setActiveCategory('all'); setActiveTypes([])
    setVerifiedOnly(false); setFreeOnly(false)
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
    if (activeCategory !== 'all')     items = items.filter(i => i.category === activeCategory)
    if (activeTypes.length > 0)       items = items.filter(i => activeTypes.includes(i.type))
    if (verifiedOnly)                 items = items.filter(i => i.verified)
    if (freeOnly)                     items = items.filter(i => i.price === 'free')
    if (sort === 'rating')            items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    else if (sort === 'price-low')    items.sort((a, b) => (a.price === 'free' ? 0 : +a.price) - (b.price === 'free' ? 0 : +b.price))
    else if (sort === 'price-high')   items.sort((a, b) => (b.price === 'free' ? 0 : +b.price) - (a.price === 'free' ? 0 : +a.price))
    else if (sort === 'popular')      items.sort((a, b) => (b.members ?? 0) - (a.members ?? 0))
    return items
  }, [search, activeCategory, activeTypes, sort, verifiedOnly, freeOnly])

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) + activeTypes.length +
    (verifiedOnly ? 1 : 0) + (freeOnly ? 1 : 0)

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden text-center" aria-label="Explore hero">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)' }} />
        {/* Blobs */}
        <div className="absolute w-[380px] h-[380px] rounded-full blur-[80px] opacity-[0.13] -top-20 -left-16 bg-[var(--p)] pointer-events-none" aria-hidden="true" />
        <div className="absolute w-[280px] h-[280px] rounded-full blur-[80px] opacity-[0.1] top-10 -right-16 bg-[var(--cyan)] pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6"
            style={{ background: 'var(--p2)', border: '1.5px solid var(--p3)', color: 'var(--p)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            200+ Creators in Tunisia & MENA
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(32px,5vw,62px)] font-black text-[var(--t1)] leading-[1.05] tracking-[-0.03em] mb-4">
            Discover What<br />
            <span className="text-[var(--p)]">Moves You</span>
          </h1>
          <p className="text-[var(--t3)] text-[clamp(14px,2vw,17px)] leading-relaxed max-w-lg mx-auto mb-8">
            Explore communities, courses, challenges, and more — all built by creators in Tunisia and MENA.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-10">
            <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search communities, courses, creators..."
              aria-label="Search explore"
              className="w-full ps-11 pe-12 py-4 rounded-2xl bg-[var(--white)] border-2 border-[var(--bd)] focus:border-[var(--p)] focus:outline-none text-[var(--t1)] placeholder:text-[var(--t3)] text-[15px] shadow-[0_4px_24px_rgba(142,120,251,.08)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="Clear search"
                className="absolute inset-y-0 end-4 flex items-center text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 flex-wrap" role="list" aria-label="Platform stats">
            {[
              { val: '4,200+', label: 'Communities', color: 'var(--p)'      },
              { val: '1,800+', label: 'Courses',     color: 'var(--orange)' },
              { val: '850+',   label: 'Creators',    color: 'var(--cyan)'   },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2" role="listitem">
                <span className="text-xl font-black" style={{ color: s.color }}>{s.val}</span>
                <span className="text-sm text-[var(--t3)] font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters (sticky) ──────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-30 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--bd)]"
        role="search" aria-label="Filter and sort">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 space-y-2.5">

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[var(--p)] text-white border-[var(--p)]'
                    : 'bg-[var(--white)] text-[var(--t2)] border-[var(--bd)] hover:border-[var(--p3)] hover:text-[var(--p)]'
                }`}>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Type toggles + quick filters + sort */}
          <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="group" aria-label="Filter by type">

            {CONTENT_TYPES.map(type => (
              <button key={type} onClick={() => toggleType(type)}
                aria-pressed={activeTypes.includes(type)}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                  activeTypes.includes(type)
                    ? 'bg-[var(--t1)] text-white border-[var(--t1)]'
                    : 'bg-[var(--white)] text-[var(--t3)] border-[var(--bd)] hover:border-[var(--bd2)] hover:text-[var(--t2)]'
                }`}>
                {TYPE_LABELS[type]}
              </button>
            ))}

            <div className="h-4 w-px bg-[var(--bd)] flex-shrink-0 mx-1" aria-hidden="true" />

            {/* Free only */}
            <button onClick={() => setFreeOnly(!freeOnly)} aria-pressed={freeOnly}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                freeOnly
                  ? 'bg-[var(--p2)] text-[var(--p)] border-[var(--p3)]'
                  : 'bg-[var(--white)] text-[var(--t3)] border-[var(--bd)] hover:border-[var(--bd2)] hover:text-[var(--t2)]'
              }`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Free only
            </button>

            {/* Verified only */}
            <button onClick={() => setVerifiedOnly(!verifiedOnly)} aria-pressed={verifiedOnly}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                verifiedOnly
                  ? 'bg-[var(--p2)] text-[var(--p)] border-[var(--p3)]'
                  : 'bg-[var(--white)] text-[var(--t3)] border-[var(--bd)] hover:border-[var(--bd2)] hover:text-[var(--t2)]'
              }`}>
              <svg viewBox="0 0 24 24" fill="none" width="11" height="11" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verified only
            </button>

            {/* Sort */}
            <div className="ms-auto flex-shrink-0">
              <label htmlFor="explore-sort" className="sr-only">Sort results</label>
              <select id="explore-sort" value={sort} onChange={e => setSort(e.target.value)}
                className="text-xs font-semibold text-[var(--t2)] bg-[var(--white)] border border-[var(--bd)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--p3)] cursor-pointer transition-colors hover:border-[var(--bd2)]">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ───────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10" id="explore-results" aria-label="Explore results">

        {/* Count + clear */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <p className="text-sm text-[var(--t3)]">
            <span className="font-bold text-[var(--t1)]">{filtered.length}</span>
            {' '}result{filtered.length !== 1 ? 's' : ''}
            {search && <> for &ldquo;<span className="text-[var(--p)] font-semibold">{search}</span>&rdquo;</>}
          </p>
          {(activeFilterCount > 0 || search) && (
            <button onClick={clearFilters}
              className="text-xs font-semibold text-[var(--p)] hover:underline flex items-center gap-1.5 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="12" height="12" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear all filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-24" role="status" aria-live="polite">
            <div className="w-16 h-16 rounded-2xl bg-[var(--p2)] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--t1)] mb-2">No results found</h3>
            <p className="text-[var(--t3)] text-sm mb-6">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            <button onClick={clearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--p)] hover:bg-[#7a64f0] transition-colors">
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Explore items">
            {filtered.map(item => (
              <div key={item.id} role="listitem">
                <ExploreCard item={item} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <div className="mx-6 md:mx-10 mb-16 rounded-3xl px-8 md:px-16 py-16 text-center overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, var(--p), var(--p-dark))' }}
        role="complementary" aria-label="Call to action">
        <div className="absolute w-64 h-64 rounded-full blur-[60px] opacity-20 -top-16 -left-16 bg-white pointer-events-none" aria-hidden="true" />
        <div className="absolute w-48 h-48 rounded-full blur-[60px] opacity-15 -bottom-12 right-0 bg-white pointer-events-none" aria-hidden="true" />
        <h2 className="text-[clamp(22px,4vw,38px)] font-black text-white mb-4 relative">
          Ready to Build Your Own Community?
        </h2>
        <p className="text-white/80 max-w-md mx-auto mb-8 relative">
          Join 850+ creators already earning from their knowledge on Chabaqa.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap relative">
          <a href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-[var(--p)] bg-white hover:bg-[var(--p2)] transition-all shadow-[0_8px_24px_rgba(0,0,0,.15)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            Start for Free
          </a>
          <a href={`${APP_URL}/explore`}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all">
            Browse the App
          </a>
        </div>
      </div>

    </div>
  )
}
