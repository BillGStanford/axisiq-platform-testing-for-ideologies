import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'AxisIQ',
  tagline: 'The Political Compass. Reimagined.',
  domain: 'axisiq.app',
  description:
    'AxisIQ is the most rigorous political compass quiz on the internet. Discover your precise ideology through 70+ research-backed questions across 8 policy domains.',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID,
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
}

export const BRAND = {
  name: 'AxisIQ',
  domain: 'axisiq.app',
  tagline: 'The Political Compass. Reimagined.',
  seoTagline: 'Find Your Political Ideology | AxisIQ Political Compass Quiz',
  description:
    'The most methodologically rigorous political compass quiz. Discover your ideology, explore its history, and understand where you stand on the global political spectrum.',
  twitterHandle: '@axisiq',
  email: 'contact@axisiq.app',
  founded: 2024,
}

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Take the Quiz' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Learn' },
]

export const FOOTER_LINKS = {
  Platform: [
    { href: '/quiz', label: 'Take the Quiz' },
    { href: '/methodology', label: 'Methodology' },
    { href: '/blog', label: 'Learn' },
    { href: '/faq', label: 'FAQ' },
  ],
  Company: [
    { href: '/about', label: 'About AxisIQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
  Resources: [
    { href: '/blog/what-is-political-compass', label: 'What is the Political Compass?' },
    { href: '/blog/left-vs-right', label: 'Left vs Right Explained' },
    { href: '/blog/authoritarian-vs-libertarian', label: 'Auth vs Libertarian' },
    { href: '/blog/how-accurate-are-political-tests', label: 'How Accurate Are Political Tests?' },
  ],
}
