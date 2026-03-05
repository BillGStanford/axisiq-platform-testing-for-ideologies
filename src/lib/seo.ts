import type { Metadata } from 'next'
import { BRAND } from '@/lib/config'

interface SeoOptions {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalPath?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

const DEFAULT_OG_IMAGE = '/og-image.png'

export function buildMetadata(options: SeoOptions = {}): Metadata {
  const {
    title,
    description = BRAND.description,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    canonicalPath = '',
    noIndex = false,
    type = 'website',
  } = options

  const fullTitle = title
    ? `${title} | ${BRAND.name}`
    : BRAND.seoTagline

  const canonicalUrl = `https://${BRAND.domain}${canonicalPath}`

  return {
    title: fullTitle,
    description,
    keywords: [
      'political compass',
      'political quiz',
      'ideology test',
      'left right political spectrum',
      'political ideology',
      ...keywords,
    ].join(', '),
    authors: [{ name: BRAND.name }],
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: BRAND.twitterHandle,
      images: [ogImage],
    },
  }
}

export function buildIdeologyMetadata(
  ideologyName: string,
  ideologyDescription: string,
  shareParams?: string
): Metadata {
  const title = `I am a ${ideologyName} — Find Your Political Identity`
  const description = `${ideologyDescription.slice(0, 150)}... Take the AxisIQ Political Compass Quiz to discover your ideology.`

  return buildMetadata({
    title,
    description,
    keywords: [ideologyName, 'political test', 'compass quiz'],
    canonicalPath: shareParams ? `/results?${shareParams}` : '/results',
    type: 'website',
  })
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    description: BRAND.description,
    sameAs: [
      `https://twitter.com/${BRAND.twitterHandle.replace('@', '')}`,
    ],
  }
}

export function getQuizJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${BRAND.name} Political Compass Quiz`,
    description: BRAND.description,
    url: `https://${BRAND.domain}/quiz`,
    author: {
      '@type': 'Organization',
      name: BRAND.name,
    },
    educationalUse: 'Political Education',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'general public',
    },
  }
}

export function getArticleJsonLd(article: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://${BRAND.domain}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: BRAND.name,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
    },
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    description: BRAND.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://${BRAND.domain}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
