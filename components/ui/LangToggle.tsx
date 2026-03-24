'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LangToggle() {
  const locale  = useLocale()
  const router  = useRouter()
  const pathname = usePathname()

  function toggle() {
    const next = locale === 'en' ? 'ar' : 'en'
    // Replace locale prefix in path
    const segments = pathname.split('/')
    if (segments[1] === 'ar' || segments[1] === 'en') {
      segments[1] = next === 'en' ? '' : next
    } else {
      segments.splice(1, 0, next === 'en' ? '' : next)
    }
    const newPath = segments.join('/').replace('//', '/') || '/'
    router.push(next === 'en' ? '/' : '/ar')
  }

  return (
    <button
      onClick={toggle}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      type="button"
      className="h-10 px-3 flex items-center gap-2 rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t2)] text-sm font-semibold hover:border-[var(--p3)] hover:text-[var(--p)] hover:bg-[var(--p2)] transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {locale === 'en' ? 'AR' : 'EN'}
    </button>
  )
}
