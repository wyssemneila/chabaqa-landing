import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealProvider from '@/components/ui/RevealProvider'
import ExploreClient from '@/components/explore/ExploreClient'

export const metadata: Metadata = {
  title:       'Explore | Chabaqa',
  description: 'Discover communities, courses, challenges, sessions, events, and digital products — all built by creators in Tunisia and MENA.',
}

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <RevealProvider />
        <ExploreClient />
      </main>
      <Footer />
    </>
  )
}
