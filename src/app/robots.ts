import { MetadataRoute } from 'next'
import { BRAND } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  }
}
