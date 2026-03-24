import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // / = English, /ar = Arabic
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
