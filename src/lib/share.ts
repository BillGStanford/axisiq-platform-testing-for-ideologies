import type { ScoreResult, ShareData } from '@/types'
import { BRAND } from '@/lib/config'
import { getIdeologyById } from '@/data/ideologies'
import { encodeResultToUrl, getAxisLabel } from '@/lib/scoring'

export function buildShareData(result: ScoreResult): ShareData {
  const ideology = getIdeologyById(result.ideologyId)
  const ideologyName = ideology?.name ?? 'Unknown'

  const shareParams = encodeResultToUrl(result)
  const shareUrl = `https://${BRAND.domain}/results?${shareParams}`

  const economicLabel = getAxisLabel(result.normalized.economic, 'economic')
  const socialLabel = getAxisLabel(result.normalized.social, 'social')

  const ogTitle = `I am a ${ideologyName} on the ${BRAND.name} Compass — Find Yours`
  const ogDescription = `${economicLabel} economically, ${socialLabel} socially. ${ideology?.description?.slice(0, 120) ?? ''}`

  const twitterText = `I just took the ${BRAND.name} Political Compass Quiz. My result: ${ideologyName} (${economicLabel}, ${socialLabel}). Find your ideology → ${shareUrl} #AxisIQ #PoliticalCompass`

  const linkedinText = `I took the ${BRAND.name} Political Compass Quiz — the most rigorous political ideology test online.\n\nMy result: ${ideologyName}\n📊 Economic: ${economicLabel} (${result.normalized.economic > 0 ? '+' : ''}${result.normalized.economic})\n🗽 Social: ${socialLabel} (${result.normalized.social > 0 ? '+' : ''}${result.normalized.social})\n\nDiscover your political identity → ${shareUrl}`

  return {
    ideologyName,
    economicScore: result.normalized.economic,
    socialScore: result.normalized.social,
    quadrant: result.quadrant,
    confidence: result.confidence,
    shareUrl,
    ogTitle,
    ogDescription,
    twitterText,
    linkedinText,
  }
}

export function openTwitterShare(text: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
}

export function openFacebookShare(shareUrl: string) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
}

export function openLinkedInShare(shareUrl: string, text: string) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch {
      document.body.removeChild(textArea)
      return false
    }
  }
}
