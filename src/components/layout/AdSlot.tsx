'use client'

import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
  responsive?: boolean
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdSlot({
  slot,
  format = 'auto',
  className,
  responsive = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!siteConfig.adsEnabled || !siteConfig.adsenseId) return
    if (initialized.current) return
    initialized.current = true

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.warn('AdSense error:', e)
    }
  }, [])

  if (!siteConfig.adsEnabled || !siteConfig.adsenseId) {
    // Development placeholder
    return (
      <div
        className={cn(
          'ad-slot flex items-center justify-center text-slate-400 text-xs border border-dashed border-slate-200',
          className
        )}
        data-ad-slot={slot}
        aria-hidden="true"
      >
        [Ad Slot: {slot}]
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden', className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={siteConfig.adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
