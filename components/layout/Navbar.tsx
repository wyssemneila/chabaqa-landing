'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LangToggle  from '@/components/ui/LangToggle'
import { APP_URL } from '@/lib/config'

export default function Navbar() {
  const t = useTranslations('nav')
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const NAV_LINKS = [
    { href: '#features', label: t('features') },
    { href: '#pricing',  label: t('pricing')  },
    { href: '/explore',  label: t('explore')  },
    { href: '/blog',     label: t('blog')     },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['features', 'how', 'pricing', 'faq']
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div ref={menuRef}>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--bd)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="/" aria-label="Chabaqa — go to homepage" className="flex-shrink-0">
          <Image src="/images/logo.svg" alt="Chabaqa" width={112} height={28} className="h-7 w-auto" />
        </a>

        {/* Desktop links */}
        <div role="menubar" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[var(--p)] bg-[var(--p2)]'
                  : 'text-[var(--t2)] hover:text-[var(--t1)] hover:bg-[var(--p2)]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
          <a
            href={`${APP_URL}/login`}
            className="hidden md:inline-flex items-center h-10 px-4 rounded-xl text-sm font-semibold text-[var(--t2)] border border-[var(--bd)] bg-[var(--white)] hover:border-[var(--p3)] hover:text-[var(--p)] transition-colors"
          >
            {t('login')}
          </a>
          <a
            href={`${APP_URL}/register`}
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold text-white bg-[var(--p)] hover:bg-[var(--p-dark)] transition-colors shadow-[0_4px_16px_rgba(142,120,251,.35)]"
          >
            {t('start')}
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          {/* Burger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--bd)] bg-[var(--white)] text-[var(--t2)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="22" height="22" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="22" height="22" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="menu"
        aria-hidden={!menuOpen}
        className={`md:hidden fixed inset-x-0 top-16 z-40 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--bd)] flex flex-col px-6 py-4 gap-2 transition-all duration-300 ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeSection === link.href.replace('#', '')
                ? 'text-[var(--p)] bg-[var(--p2)]'
                : 'text-[var(--t2)] hover:bg-[var(--p2)]'
            }`}
          >
            {link.label}
          </a>
        ))}
        <div className="flex gap-2 mt-2 pt-2 border-t border-[var(--bd)]">
          <a href={`${APP_URL}/login`}    onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
            className="flex-1 flex items-center justify-center h-10 rounded-xl text-sm font-semibold text-[var(--t2)] border border-[var(--bd)] bg-[var(--white)]">{t('login')}</a>
          <a href={`${APP_URL}/register`} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
            className="flex-1 flex items-center justify-center h-10 rounded-xl text-sm font-semibold text-white bg-[var(--p)]">{t('start')}</a>
        </div>
      </div>
    </div>
  )
}
