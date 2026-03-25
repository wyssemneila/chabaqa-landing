'use client'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'

interface Props {
  children: ReactNode
  locale: string
  messages: Record<string, unknown>
}

export default function Providers({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="chabaqa_theme"
      >
        <LoadingScreen />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
