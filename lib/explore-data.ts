// ── Types ─────────────────────────────────────────────────────────────────
export type ContentType = 'community' | 'course' | 'challenge' | 'product' | 'session' | 'event'
export type Category    = 'all' | 'fitness' | 'education' | 'technology' | 'business' | 'creative' | 'arts'

export interface ExploreItem {
  id:               string
  type:             ContentType
  category:         Exclude<Category, 'all'>
  title:            string
  desc:             string
  creator:          string
  creatorInitials:  string
  creatorColor:     string
  coverGradient:    string
  price:            number | 'free'
  currency?:        string
  members?:         number
  rating?:          number
  ratingCount?:     number
  verified?:        boolean
  featured?:        boolean
  duration?:        string
  date?:            string
}

// ── Categories ────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = ['all', 'fitness', 'education', 'technology', 'business', 'creative', 'arts']

export const CATEGORY_LABELS: Record<Category, string> = {
  all:        'All',
  fitness:    'Fitness',
  education:  'Education',
  technology: 'Technology',
  business:   'Business',
  creative:   'Creative',
  arts:       'Arts',
}

// ── Content types ─────────────────────────────────────────────────────────
export const CONTENT_TYPES: ContentType[] = ['community', 'course', 'challenge', 'product', 'session', 'event']

export const TYPE_CONFIG: Record<ContentType, { label: string; bg: string; color: string; border: string }> = {
  community: { label: 'Community',  bg: 'var(--p2)',  color: 'var(--p)',      border: 'var(--p3)'  },
  course:    { label: 'Course',     bg: 'var(--o2)',  color: 'var(--orange)', border: '#fde5bb'    },
  challenge: { label: 'Challenge',  bg: 'var(--c2)',  color: 'var(--cyan)',   border: '#a5f3fc'    },
  product:   { label: 'Product',    bg: 'var(--pk2)', color: 'var(--pink)',   border: '#fda4af'    },
  session:   { label: '1:1 Session',bg: 'var(--o2)',  color: 'var(--orange)', border: '#fde5bb'    },
  event:     { label: 'Event',      bg: 'var(--p2)',  color: 'var(--p)',      border: 'var(--p3)'  },
}

export const TYPE_LABELS: Record<ContentType, string> = {
  community: 'Community',
  course:    'Course',
  challenge: 'Challenge',
  product:   'Product',
  session:   '1:1 Session',
  event:     'Event',
}

export const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular'        },
  { value: 'newest',     label: 'Newest'              },
  { value: 'rating',     label: 'Top Rated'           },
  { value: 'price-low',  label: 'Price: Low to High'  },
  { value: 'price-high', label: 'Price: High to Low'  },
] as const

// ── Mock data ─────────────────────────────────────────────────────────────
export const EXPLORE_ITEMS: ExploreItem[] = [
  {
    id: '1',
    type: 'community', category: 'fitness',
    title: 'FitLife Arabic Community',
    desc: 'The largest Arabic fitness community — workouts, challenges, and nutrition plans in one place.',
    creator: 'Coach Karim', creatorInitials: 'CK', creatorColor: '#8e78fb',
    coverGradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    price: 'free', members: 4820, rating: 4.8, ratingCount: 312, verified: true, featured: true,
  },
  {
    id: '2',
    type: 'course', category: 'technology',
    title: 'Full-Stack Web Dev Bootcamp',
    desc: 'From zero to job-ready in 12 weeks. React, Node.js, and deployment covered end to end.',
    creator: 'Sami Tech', creatorInitials: 'ST', creatorColor: '#47c7ea',
    coverGradient: 'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
    price: 299, currency: 'TND', members: 1240, rating: 4.9, ratingCount: 198, verified: true, duration: '12 weeks',
  },
  {
    id: '3',
    type: 'challenge', category: 'fitness',
    title: '30-Day Ramadan Fitness Challenge',
    desc: 'Stay active and energized during Ramadan with daily workout and mindfulness challenges.',
    creator: 'Nour Wellness', creatorInitials: 'NW', creatorColor: '#f65887',
    coverGradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    price: 'free', members: 2100, rating: 4.7, ratingCount: 89,
  },
  {
    id: '4',
    type: 'community', category: 'business',
    title: 'MENA Entrepreneurs Hub',
    desc: 'Connect with 5,000+ entrepreneurs across North Africa and the Middle East.',
    creator: 'Startup MENA', creatorInitials: 'SM', creatorColor: '#ff9b28',
    coverGradient: 'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
    price: 49, currency: 'TND', members: 5300, rating: 4.6, ratingCount: 421, verified: true, featured: true,
  },
  {
    id: '5',
    type: 'session', category: 'business',
    title: '1:1 Business Strategy Session',
    desc: 'Personalized advice on your business model, pricing, and go-to-market strategy.',
    creator: 'Yasmine Coaching', creatorInitials: 'YC', creatorColor: '#8e78fb',
    coverGradient: 'linear-gradient(135deg,#4776E6 0%,#8E54E9 100%)',
    price: 120, currency: 'TND', duration: '60 min', rating: 5.0, ratingCount: 54, verified: true,
  },
  {
    id: '6',
    type: 'course', category: 'creative',
    title: 'Arabic Calligraphy Masterclass',
    desc: 'Learn traditional and modern Arabic calligraphy from a master calligrapher in 8 weeks.',
    creator: 'Ustaz Bilal', creatorInitials: 'UB', creatorColor: '#ff9b28',
    coverGradient: 'linear-gradient(135deg,#c94b4b 0%,#4b134f 100%)',
    price: 149, currency: 'TND', members: 680, rating: 4.9, ratingCount: 145, verified: true, duration: '8 weeks',
  },
  {
    id: '7',
    type: 'community', category: 'education',
    title: 'Bac & Concours Prep Tunisia',
    desc: 'Everything to ace the Tunisian Bac — past papers, study groups, and expert tutors.',
    creator: 'EduTN', creatorInitials: 'ET', creatorColor: '#47c7ea',
    coverGradient: 'linear-gradient(135deg,#00b4db 0%,#0083b0 100%)',
    price: 'free', members: 12400, rating: 4.5, ratingCount: 892, verified: true, featured: true,
  },
  {
    id: '8',
    type: 'product', category: 'creative',
    title: 'Social Media Pack — Arabic Templates',
    desc: '120 ready-to-post Canva templates in Arabic for Instagram, Facebook, and TikTok.',
    creator: 'DesignArab', creatorInitials: 'DA', creatorColor: '#f65887',
    coverGradient: 'linear-gradient(135deg,#ee0979 0%,#ff6a00 100%)',
    price: 79, currency: 'TND', rating: 4.8, ratingCount: 203,
  },
  {
    id: '9',
    type: 'course', category: 'business',
    title: 'E-Commerce from Scratch',
    desc: 'Build and launch your online store in Tunisia with Shopify, WooCommerce, or Chabaqa.',
    creator: 'Rania Sells', creatorInitials: 'RS', creatorColor: '#ff9b28',
    coverGradient: 'linear-gradient(135deg,#1FA2FF 0%,#12D8FA 50%,#A6FFCB 100%)',
    price: 199, currency: 'TND', members: 890, rating: 4.7, ratingCount: 167, verified: true, duration: '6 weeks',
  },
  {
    id: '10',
    type: 'event', category: 'technology',
    title: 'TechTunisia Summit 2025',
    desc: 'Join 500+ tech leaders and startup founders for a full day of talks, workshops, and networking.',
    creator: 'TechTN Events', creatorInitials: 'TE', creatorColor: '#47c7ea',
    coverGradient: 'linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)',
    price: 35, currency: 'TND', date: 'May 15, 2025', rating: 4.9, ratingCount: 78, verified: true,
  },
  {
    id: '11',
    type: 'community', category: 'arts',
    title: 'Tunisian Photographers Collective',
    desc: 'Share your shots, get critique, and join photo walks across Tunisia with fellow photographers.',
    creator: 'Lens TN', creatorInitials: 'LT', creatorColor: '#8e78fb',
    coverGradient: 'linear-gradient(135deg,#232526 0%,#414345 100%)',
    price: 'free', members: 3200, rating: 4.6, ratingCount: 241,
  },
  {
    id: '12',
    type: 'session', category: 'fitness',
    title: 'Personal Nutrition Coaching',
    desc: 'Customized meal plans and weekly check-ins designed for your specific goals and lifestyle.',
    creator: 'Dr. Amel', creatorInitials: 'AN', creatorColor: '#47c7ea',
    coverGradient: 'linear-gradient(135deg,#56ab2f 0%,#a8e063 100%)',
    price: 89, currency: 'TND', duration: '45 min', rating: 4.8, ratingCount: 92, verified: true,
  },
]
