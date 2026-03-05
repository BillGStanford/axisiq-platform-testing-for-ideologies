'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Share2, Twitter, Facebook, Linkedin, Copy, Check, RefreshCw,
  BookOpen, Users, Globe, Building, Brain, TrendingUp, TrendingDown,
  Award, Info, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CompassVisualization } from '@/components/results/CompassVisualization'
import { decodeResultFromUrl, getAxisLabel } from '@/lib/scoring'
import { getIdeologyById, IDEOLOGIES } from '@/data/ideologies'
import { buildShareData, openTwitterShare, openFacebookShare, openLinkedInShare, copyToClipboard } from '@/lib/share'
import { trackShare, trackResultView } from '@/lib/analytics'
import { BRAND } from '@/lib/config'
import type { ScoreResult, Ideology } from '@/types'
import { cn } from '@/lib/utils'

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']))
  const [result, setResult] = useState<Partial<ScoreResult> | null>(null)
  const [ideology, setIdeology] = useState<Ideology | null>(null)

  useEffect(() => {
    const decoded = decodeResultFromUrl(searchParams)
    if (!decoded || !decoded.normalized || !decoded.ideologyId) {
      router.push('/quiz')
      return
    }
    setResult(decoded)
    const found = getIdeologyById(decoded.ideologyId)
    setIdeology(found ?? null)

    if (decoded.ideologyId) trackResultView(decoded.ideologyId)
  }, [searchParams, router])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      return next
    })
  }

  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    if (!result?.normalized || !ideology) return

    const shareData = buildShareData(result as ScoreResult)
    trackShare(platform, ideology.id)

    switch (platform) {
      case 'twitter':
        openTwitterShare(shareData.twitterText)
        break
      case 'facebook':
        openFacebookShare(shareData.shareUrl)
        break
      case 'linkedin':
        openLinkedInShare(shareData.shareUrl, shareData.linkedinText)
        break
      case 'copy':
        await copyToClipboard(shareData.shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  if (!result || !ideology || !result.normalized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-axiom-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading your results...</p>
        </div>
      </div>
    )
  }

  const economicLabel = getAxisLabel(result.normalized.economic, 'economic')
  const socialLabel = getAxisLabel(result.normalized.social, 'social')

  const similarIdeologies = ideology.similarIdeologies
    .map((id) => IDEOLOGIES.find((i) => i.id === id))
    .filter(Boolean) as Ideology[]

  const opposingIdeologies = ideology.opposingIdeologies
    .map((id) => IDEOLOGIES.find((i) => i.id === id))
    .filter(Boolean) as Ideology[]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-slate-50 to-white">

        {/* ─── HERO RESULT ──────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white border-b border-slate-100">
          <div className="container-axiom">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Identity */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                    style={{ background: ideology.color + '20', color: ideology.color }}
                  >
                    Your Result
                  </div>
                  <h1 className="heading-xl text-slate-900 mb-2">
                    {ideology.name}
                  </h1>
                  {ideology.subName && (
                    <p className="text-lg text-slate-500 mb-4 font-display">{ideology.subName}</p>
                  )}
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {ideology.description}
                  </p>

                  {/* Score badges */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl">
                      <span className="text-xs text-slate-500 font-mono">Economic</span>
                      <span className="font-bold text-sm text-slate-900">
                        {result.normalized.economic > 0 ? '+' : ''}{result.normalized.economic.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500">({economicLabel})</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl">
                      <span className="text-xs text-slate-500 font-mono">Social</span>
                      <span className="font-bold text-sm text-slate-900">
                        {result.normalized.social > 0 ? '+' : ''}{result.normalized.social.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500">({socialLabel})</span>
                    </div>
                    {result.confidence && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-axiom-50 rounded-xl">
                        <span className="text-xs text-axiom-600 font-mono">Confidence</span>
                        <span className="font-bold text-sm text-axiom-700">{result.confidence}%</span>
                      </div>
                    )}
                  </div>

                  {/* Share buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Twitter size={14} />
                      Share on X
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Facebook size={14} />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {/* Right: Compass */}
                <div className="flex justify-center">
                  <CompassVisualization
                    economic={result.normalized.economic}
                    social={result.normalized.social}
                    size={360}
                    animated={true}
                    showLabels={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AD SLOT ──────────────────────────────────────────── */}
        <div className="py-4 bg-slate-50">
          <div className="container-narrow">
            <div className="ad-slot" data-ad-slot="after-results" aria-label="Advertisement" />
          </div>
        </div>

        {/* ─── DETAILED RESULTS ─────────────────────────────────── */}
        <section className="py-12">
          <div className="container-axiom">
            <div className="max-w-4xl mx-auto space-y-4">

              {/* Key Beliefs */}
              <ResultAccordion
                id="beliefs"
                title="Core Beliefs"
                icon={<Brain size={18} />}
                expanded={expandedSections.has('beliefs')}
                onToggle={() => toggleSection('beliefs')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ideology.keyBeliefs.map((belief, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: ideology.color }} />
                      <p className="text-sm text-slate-700">{belief}</p>
                    </div>
                  ))}
                </div>
              </ResultAccordion>

              {/* Economic & Social Policies */}
              <ResultAccordion
                id="policies"
                title="Policy Positions"
                icon={<TrendingUp size={18} />}
                expanded={expandedSections.has('policies')}
                onToggle={() => toggleSection('policies')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Economic</h4>
                    <ul className="space-y-2">
                      {ideology.economicPolicies.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs">$</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Social</h4>
                    <ul className="space-y-2">
                      {ideology.socialPolicies.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-xs">⚖</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ResultAccordion>

              {/* Historical & Modern Parties */}
              <ResultAccordion
                id="parties"
                title="Associated Political Parties"
                icon={<Building size={18} />}
                expanded={expandedSections.has('parties')}
                onToggle={() => toggleSection('parties')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Historical</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.historicalParties.map((p) => (
                        <span key={p} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Modern</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.modernParties.map((p) => (
                        <span key={p} className="px-2.5 py-1 bg-axiom-50 text-axiom-700 rounded-lg text-xs">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ResultAccordion>

              {/* Historical & Modern Figures */}
              <ResultAccordion
                id="figures"
                title="Associated Figures"
                icon={<Users size={18} />}
                expanded={expandedSections.has('figures')}
                onToggle={() => toggleSection('figures')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Historical</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.historicalFigures.map((f) => (
                        <span key={f} className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Modern</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.modernFigures.map((f) => (
                        <span key={f} className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ResultAccordion>

              {/* Thinkers & Organizations */}
              <ResultAccordion
                id="thinkers"
                title="Key Thinkers & Organizations"
                icon={<Brain size={18} />}
                expanded={expandedSections.has('thinkers')}
                onToggle={() => toggleSection('thinkers')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Philosophers & Thinkers</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.thinkers.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">Organizations</h4>
                    <div className="flex flex-wrap gap-2">
                      {ideology.organizations.map((o) => (
                        <span key={o} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm">{o}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ResultAccordion>

              {/* Suggested Reading */}
              <ResultAccordion
                id="reading"
                title="Suggested Reading"
                icon={<BookOpen size={18} />}
                expanded={expandedSections.has('reading')}
                onToggle={() => toggleSection('reading')}
              >
                <div className="space-y-4">
                  {ideology.suggestedReading.map((book) => (
                    <div key={book.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-14 bg-axiom-100 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-axiom-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{book.title}</h4>
                        <p className="text-xs text-slate-500 mb-1">{book.author} · {book.year}</p>
                        <p className="text-sm text-slate-600">{book.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ResultAccordion>

              {/* Critiques */}
              <ResultAccordion
                id="critiques"
                title="Common Critiques"
                icon={<Info size={18} />}
                expanded={expandedSections.has('critiques')}
                onToggle={() => toggleSection('critiques')}
              >
                <div className="space-y-3">
                  {ideology.critiques.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <span className="text-amber-500 mt-0.5">⚠</span>
                      <p className="text-sm text-amber-800">{c}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  These critiques are presented for educational balance. AxisIQ takes no political position.
                </p>
              </ResultAccordion>

            </div>
          </div>
        </section>

        {/* ─── SIMILAR & OPPOSING ───────────────────────────────── */}
        <section className="py-12 bg-slate-50">
          <div className="container-axiom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarIdeologies.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      Similar Ideologies
                    </h3>
                    <div className="space-y-2">
                      {similarIdeologies.map((i) => (
                        <div key={i.id} className="card-solid p-3 flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i.color }} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{i.name}</p>
                            <p className="text-xs text-slate-500">{i.subName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {opposingIdeologies.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingDown size={16} className="text-red-600" />
                      Opposing Ideologies
                    </h3>
                    <div className="space-y-2">
                      {opposingIdeologies.map((i) => (
                        <div key={i.id} className="card-solid p-3 flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i.color }} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{i.name}</p>
                            <p className="text-xs text-slate-500">{i.subName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTAs ─────────────────────────────────────────────── */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="container-narrow text-center">
            <h2 className="heading-md text-slate-900 mb-4">Explore further</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/quiz" className="btn-primary">
                <RefreshCw size={16} />
                Retake the Quiz
              </Link>
              <Link href="/methodology" className="btn-secondary">
                How scoring works
              </Link>
              <Link href="/blog" className="btn-secondary">
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* ─── DISCLAIMER ───────────────────────────────────────── */}
        <section className="py-6 bg-slate-50 border-t border-slate-100">
          <div className="container-narrow">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              <strong>Disclaimer:</strong> AxisIQ is a non-partisan educational platform. Results are for informational purposes only and do not constitute a professional political assessment. Ideology labels are simplified representations of complex political philosophies. AxisIQ has no political affiliation and does not endorse any party, candidate, or ideology.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function ResultAccordion({
  id,
  title,
  icon,
  expanded,
  onToggle,
  children,
}: {
  id: string
  title: string
  icon: React.ReactNode
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="card-solid overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <span className="text-axiom-600">{icon}</span>
          <span className="font-display font-semibold text-slate-900">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-5">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-axiom-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
