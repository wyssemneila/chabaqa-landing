// ── Hero pill features ──
export const HERO_PILLS: HeroPill[] = [
  {
    id: 'community',
    image: '/images/community.webp',
    label: 'Community',
    position: { top: '18%', left: '6%' },
    animDelay: '0s',
    duration: '5s',
    borderColor: '#c4b8fd',
    iconColor: 'var(--p)',
    title: 'Community Feed',
    desc: 'Build your private community with feed, reactions, announcements and direct messages.',
  },
  {
    id: 'courses',
    image: '/images/courses.webp',
    label: 'Online Courses',
    position: { top: '28%', right: '5%' },
    animDelay: '-2s',
    duration: '7s',
    borderColor: '#fde5bb',
    iconColor: 'var(--orange)',
    title: 'Online Courses',
    desc: 'Create and sell structured courses with video chapters, progress tracking and certificates.',
  },
  {
    id: 'challenges',
    image: '/images/challenge.webp',
    label: 'Challenges',
    position: { top: '60%', left: '4%' },
    animDelay: '-1s',
    duration: '6s',
    borderColor: '#a5f3fc',
    iconColor: 'var(--cyan)',
    title: 'Challenges',
    desc: 'Run time-based competitive programs that maximize engagement and community activity.',
  },
  {
    id: 'products',
    image: '/images/product.webp',
    label: 'Products',
    position: { top: '68%', right: '5%' },
    animDelay: '-3s',
    duration: '8s',
    borderColor: '#fda4af',
    iconColor: 'var(--pink)',
    title: 'Digital Products',
    desc: 'Sell e-books, templates, presets and downloads with instant delivery.',
  },
  {
    id: 'events',
    image: '/images/events.webp',
    label: 'Events',
    position: { top: '42%', left: '2%' },
    animDelay: '-4s',
    duration: '9s',
    borderColor: '#c4b8fd',
    iconColor: 'var(--p)',
    title: 'Events',
    desc: 'Host online and offline events with ticketing, RSVPs and automated reminders.',
  },
  {
    id: 'sessions',
    image: '/images/session.webp',
    label: '1:1 Sessions',
    position: { top: '48%', right: '3%' },
    animDelay: '-5s',
    duration: '7s',
    borderColor: '#fde5bb',
    iconColor: 'var(--orange)',
    title: '1:1 Coaching Sessions',
    desc: 'Let students book, pay and get meeting links — all automated from your calendar.',
  },
]

// ── Features tabs ──
export const FEATURES: Feature[] = [
  { id: 'community',   name: 'Community',          desc: 'Build & engage your audience daily',              iconBg: 'var(--p2)',  iconBorder: 'var(--p3)',   iconColor: 'var(--p)',      url: 'chabaqa.io/community'  },
  { id: 'courses',     name: 'Online Courses',      desc: 'Create, sell & track structured learning',        iconBg: 'var(--o2)',  iconBorder: '#fde5bb',     iconColor: 'var(--orange)', url: 'chabaqa.io/courses'    },
  { id: 'challenges',  name: 'Challenges',          desc: 'Drive daily engagement with time-based programs', iconBg: 'var(--c2)',  iconBorder: '#a5f3fc',     iconColor: 'var(--cyan)',   url: 'chabaqa.io/challenges' },
  { id: 'products',    name: 'Digital Products',    desc: 'Sell templates, presets & e-books instantly',     iconBg: 'var(--pk2)', iconBorder: '#fda4af',     iconColor: 'var(--pink)',   url: 'chabaqa.io/products'   },
  { id: 'events',      name: 'Events',              desc: 'Host & sell tickets for online/offline events',   iconBg: 'var(--p2)',  iconBorder: 'var(--p3)',   iconColor: 'var(--p)',      url: 'chabaqa.io/events'     },
  { id: 'sessions',    name: '1:1 Coaching Sessions', desc: 'Book, pay & meet — all automated',             iconBg: 'var(--o2)',  iconBorder: '#fde5bb',     iconColor: 'var(--orange)', url: 'chabaqa.io/sessions'   },
  { id: 'analytics',   name: 'Analytics',           desc: 'Revenue, growth & engagement in real time',      iconBg: 'var(--pk2)', iconBorder: '#fda4af',     iconColor: 'var(--pink)',   url: 'chabaqa.io/analytics'  },
]

// ── Feature placeholder content ──
export const FEATURE_PLACEHOLDERS: Record<string, { title: string; desc: string; video: string }> = {
  community:  { title: 'Community',           desc: 'Posts, reactions, announcements & direct messages — your members connected every day.' , video: '/videos/communt.mp4' },
  courses:    { title: 'Online Courses',       desc: 'Build structured courses with video chapters, progress tracking and certificates.', video: '/videos/course.mp4' },
  challenges: { title: 'Challenges',           desc: 'Time-based competitive programs to drive daily engagement and retention.' , video: '/videos/challenge.mp4' },
  products:   { title: 'Digital Products',     desc: 'Sell e-books, presets, templates — instant delivery, passive income.', video: '/videos/product.mp4' },
  events:     { title: 'Events',               desc: 'Host online & offline events with ticketing, RSVPs and automated reminders.' , video: '/videos/event.mp4' },
  sessions:   { title: '1:1 Coaching Sessions', desc: 'Students book, pay and get meeting links — all automated.' , video: '/videos/session.mp4' },
  analytics:  { title: 'Analytics',            desc: 'Track revenue, members, engagement and course progress in real time.' , video: '/videos/analytics (1).mp4' },
}

// ── How it works ──
export const STEPS = [
  { num: '1', title: 'Create your community', desc: 'Sign up, name your community, add a description and banner. Takes 3 minutes. Your invite link is live immediately.', color: 'var(--p)', shadow: 'rgba(142,120,251,.35)' },
  { num: '2', title: 'Add your content',      desc: 'Upload course videos, create challenges, set your coaching calendar, and list your digital products — all from one dashboard.', color: 'var(--cyan)', shadow: 'rgba(71,199,234,.35)' },
  { num: '3', title: 'Share & earn',          desc: 'Share your invite link. Members join, pay, and engage. You get paid with transparent transaction fees starting at 2.9%.', color: 'var(--orange)', shadow: 'rgba(255,155,40,.35)' },
]

// ── Tutorial videos ──
export const VIDEOS: Video[] = [
  { id: 'EmuPphacf0k', num: '01', tag: 'Getting Started', dur: '3:32', title: 'How to Create Your Community on Chabaqa',   desc: 'Set up your community in minutes — name, banner, invite link.' },
  { id: 'sEXWWLlhuqA', num: '02', tag: 'Courses',         dur: '4:15', title: 'Build & Sell Your First Online Course',      desc: 'Upload videos, create chapters, set pricing and publish.' },
  { id: 'PyHE0D9pWFU', num: '03', tag: 'Challenges',      dur: '3:10', title: 'Launch a 7-Day Challenge',                   desc: 'Boost daily member engagement and retention.' },
  { id: 'tmnUakwzMpQ', num: '04', tag: 'Coaching',        dur: '2:59', title: 'Set Up Your 1:1 Coaching Calendar',          desc: 'Book, pay and meet — fully automated.' },
  { id: 'Om87N_xrcfQ', num: '05', tag: 'Products',        dur: '3:39', title: 'Sell Digital Products & Earn Passively',     desc: 'Upload, price and sell presets or e-books instantly.' },
  { id: 'YXoqN0vRLe8', num: '06', tag: 'Events',          dur: '3:06', title: 'Track Your Growth with Analytics',           desc: 'Revenue, engagement and member growth in real time.' },
]

// ── Pricing plans ──
export const PLANS: Plan[] = [
  {
    badge: '🌱 Starter', name: 'Starter', desc: 'Perfect for getting started',
    monthlyPrice: 0, yearlyPrice: 0,
    price: '0', period: 'TND / month · 7-day free trial', fee: 'Transaction fee: 7.9%',
    featured: false,
    features: ['1 Community (up to 100 members)', 'Activate up to 3 Courses', 'Digital Products enabled', '2 GB Storage', 'Basic analytics', '24/7 Support'],
  },
  {
    badge: '⭐ Most Popular', name: 'Growth', desc: 'For growing communities',
    monthlyPrice: 79, yearlyPrice: 66,
    price: '79', period: 'TND / month · 7-day free trial', fee: 'Transaction fee: 4.9%',
    featured: true,
    features: ['Up to 3 Communities (10k members)', 'Unlimited Courses', 'Challenges, Sessions & Events', 'Magic Reach automation (500/mo)', 'Member gamification', 'Verified badge · 50 GB storage', '24/7 Priority Support'],
  },
  {
    badge: '🚀 Pro', name: 'Pro', desc: 'For professional creators',
    monthlyPrice: 199, yearlyPrice: 165,
    price: '199', period: 'TND / month · 7-day free trial', fee: 'Transaction fee: 2.9%',
    featured: false,
    features: ['Unlimited Communities & Members', 'Unlimited automation', 'Add up to 3 team admins', 'Custom domain name', 'Featured badge + top listings', '24/7 VIP Support'],
  },
]

// ── Types ──
export interface HeroPill {
  id: string; label: string
  position: Record<string, string>
  animDelay: string; duration: string
  borderColor: string; iconColor: string
  title: string; desc: string
  image: string
}
export interface Feature {
  id: string; name: string; desc: string
  iconBg: string; iconBorder: string; iconColor: string; url: string
}
export interface Video  { id: string; num: string; tag: string; dur: string; title: string; desc: string }
export interface Plan   { badge: string; name: string; desc: string; monthlyPrice: number; yearlyPrice: number; price: string; period: string; fee: string; featured: boolean; features: string[] }
