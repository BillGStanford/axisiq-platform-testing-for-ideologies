'use client'

import { siteConfig } from '@/lib/config'

type EventName =
  | 'quiz_start'
  | 'quiz_section_complete'
  | 'quiz_complete'
  | 'quiz_retake'
  | 'result_share_click'
  | 'result_view'
  | 'ideology_expand'
  | 'page_view'
  | 'ad_impression'

interface EventProperties {
  section?: string
  ideology?: string
  platform?: string
  question_count?: number
  time_taken?: number
  economic_score?: number
  social_score?: number
  confidence?: number
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (!siteConfig.analyticsEnabled) return
  if (typeof window === 'undefined') return

  try {
    if (window.gtag) {
      window.gtag('event', name, {
        event_category: 'engagement',
        ...properties,
      })
    }

    // Also push to dataLayer for GTM compatibility
    if (window.dataLayer) {
      window.dataLayer.push({
        event: name,
        ...properties,
      })
    }
  } catch (e) {
    // Silently fail — analytics should never break the app
    console.warn('Analytics error:', e)
  }
}

export function trackQuizStart() {
  trackEvent('quiz_start', { timestamp: Date.now() })
}

export function trackSectionComplete(sectionId: string, questionCount: number) {
  trackEvent('quiz_section_complete', {
    section: sectionId,
    question_count: questionCount,
  })
}

export function trackQuizComplete(
  economicScore: number,
  socialScore: number,
  ideology: string,
  confidence: number,
  timeTakenMs: number
) {
  trackEvent('quiz_complete', {
    economic_score: Math.round(economicScore),
    social_score: Math.round(socialScore),
    ideology,
    confidence,
    time_taken: Math.round(timeTakenMs / 1000),
  })
}

export function trackShare(platform: string, ideology: string) {
  trackEvent('result_share_click', { platform, ideology })
}

export function trackResultView(ideology: string) {
  trackEvent('result_view', { ideology })
}
