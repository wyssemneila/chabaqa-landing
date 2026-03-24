import type { Metadata } from 'next'
import { Montserrat, Tajawal } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { locales } from '@/i18n'
import Providers from '@/components/providers'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chabaqa.io'),
  title: 'Chabaqa — Build Your Creator Community',
  description: 'All-in-one community platform for creators, coaches, and educators in MENA.',
  openGraph: {
    title: 'Chabaqa — Build Your Creator Community',
    description: 'All-in-one community platform for creators, coaches, and educators in MENA.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Chabaqa',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chabaqa — Build Your Creator Community',
    description: 'All-in-one community platform for creators, coaches, and educators in MENA.',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    // suppressHydrationWarning is required: next-themes adds a class to <html> on the client,
    // which differs from the server render. This is a documented and safe usage.
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${montserrat.variable} ${tajawal.variable}`}>
      <body>
        <Providers locale={locale} messages={messages as Record<string, unknown>}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
