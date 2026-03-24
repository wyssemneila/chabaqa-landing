'use client'
import { useTranslations } from 'next-intl'

const FOOTER_HREFS: string[][] = [
  ['#features', '#pricing', '#features', '#features', '#features'],
  ['#', '#', '#', 'mailto:hello@chabaqa.io'],
  ['#', '#', '#'],
]

export default function Footer() {
  const t       = useTranslations('footer')
  const columns = t.raw('columns') as Record<string, string[]>
  const bottomLinks = t.raw('bottomLinks') as string[]

  return (
    <footer className="bg-[var(--footer-bg)] pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="Chabaqa — go to top" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--p)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-white font-extrabold text-lg">Chabaqa</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{t('tagline')}</p>
            <div className="flex gap-3">
              {[
                { href: 'https://instagram.com/chabaqa', label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { href: 'https://twitter.com/chabaqa',   label: 'X (Twitter)', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                { href: 'https://linkedin.com/company/chabaqa', label: 'LinkedIn', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Chabaqa on ${label}`}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">{icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {Object.entries(columns).map(([heading, links], colIdx) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-4">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link, linkIdx) => (
                  <li key={link}>
                    <a href={FOOTER_HREFS[colIdx]?.[linkIdx] ?? '#'} className="text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-sm">{t('copyright')}</span>
          <div className="flex items-center gap-4">
            {bottomLinks.map((label) => (
              <a key={label} href="#" className="text-white/40 hover:text-white text-sm transition-colors">{label}</a>
            ))}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
            {t('backTop')}
          </button>
        </div>
      </div>
    </footer>
  )
}
