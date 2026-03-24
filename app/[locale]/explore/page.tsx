import type { Metadata } from 'next'
import ExploreClient from '@/components/explore/ExploreClient'

export const metadata: Metadata = {
  title:       'Explore | Chabaqa',
  description: 'Discover communities, courses, challenges, sessions, events, and digital products — all built by creators in Tunisia and MENA.',
}

export default function ExplorePage() {
  return <ExploreClient />
}
