import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Videos from '@/components/sections/Videos'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import CTABanner from '@/components/sections/CTABanner'
import RevealProvider from '@/components/ui/RevealProvider'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--p)] focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <RevealProvider />
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Videos />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
