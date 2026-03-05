import { MetadataRoute } from 'next'
import { BRAND } from '@/lib/config'
import { IDEOLOGIES } from '@/data/ideologies'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/quiz`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/methodology`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/about`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const blogPages = [
    'what-is-political-compass',
    'left-vs-right',
    'authoritarian-vs-libertarian',
    'how-accurate-are-political-tests',
  ].map((slug) => ({
    url: `${base}/blog/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...blogPages]
}
