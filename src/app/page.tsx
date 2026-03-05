import Link from 'next/link'
import { ArrowRight, BarChart3, Shield, Zap, Globe, Users, BookOpen, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata, getQuizJsonLd } from '@/lib/seo'
import { BRAND } from '@/lib/config'
import { QUIZ_SECTIONS } from '@/data/questions'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'AxisIQ — The Political Compass Quiz, Reimagined',
  description: BRAND.description,
  canonicalPath: '/',
})

const STATS = [
  { value: '70+', label: 'Research-backed questions' },
  { value: '8', label: 'Policy domains' },
  { value: '12+', label: 'Ideology profiles' },
  { value: '2', label: 'Scored axes' },
]

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Precision Scoring',
    description: 'Weighted question scoring with confidence intervals, anti-bias correction, and population percentiles.',
  },
  {
    icon: Shield,
    title: 'Methodologically Transparent',
    description: 'Full methodology documentation. No hidden political agenda. No advertiser influence.',
  },
  {
    icon: Zap,
    title: 'Nuanced Question Types',
    description: 'Seven-point Likert scales, tradeoff questions, and yes/no binaries — not just agree/disagree.',
  },
  {
    icon: Globe,
    title: 'Global Context',
    description: 'Compare your ideology to historical and modern parties worldwide. Not just US politics.',
  },
  {
    icon: Users,
    title: 'Rich Ideology Profiles',
    description: 'Detailed profiles with thinkers, readings, historical figures, and similar/opposing ideologies.',
  },
  {
    icon: BookOpen,
    title: 'Educational by Design',
    description: 'Long-form articles explaining the political spectrum. Built to inform, not to label.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Finally, a political quiz that treats me like an adult. The methodology page alone is worth the visit.',
    author: 'Political Science Graduate',
  },
  {
    quote: "More nuanced than the Political Compass. The tradeoff questions actually make you think.",
    author: 'Policy Researcher',
  },
  {
    quote: 'The ideology breakdown is encyclopedic. I ended up reading for hours.',
    author: 'High School Teacher',
  },
]

export default function HomePage() {
  const quizJsonLd = getQuizJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <Header />

      <main>
        {/* ─── HERO ───────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-axiom-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="container-axiom relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-axiom-50 border border-axiom-200 rounded-full text-axiom-700 text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-axiom-500 animate-pulse" />
                The most rigorous political quiz online
              </div>

              {/* Headline */}
              <h1 className="heading-xl text-slate-900 mb-6">
                Understand your{' '}
                <span className="text-axiom-600 relative">
                  political ideology
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
                    <path d="M0 6 Q75 0 150 4 Q225 8 300 2" stroke="#4c53e5" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>{' '}
                with precision.
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                AxisIQ goes beyond left and right. 70+ carefully designed questions across 8 policy domains, scoring you on two independent axes with full methodological transparency.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                <Link href="/quiz" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-axiom-200">
                  Take the Quiz — Free
                  <ArrowRight size={18} />
                </Link>
                <Link href="/methodology" className="btn-secondary text-base px-6 py-3.5">
                  Read the Methodology
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-display font-bold text-axiom-600">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero compass illustration */}
            <div className="mt-16 max-w-sm mx-auto relative">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-axiom-50 rounded-bl-3xl" />
                <div className="relative">
                  {/* Simplified compass preview */}
                  <svg viewBox="0 0 280 260" className="w-full" role="img" aria-label="Political compass illustration">
                    <defs>
                      <radialGradient id="hero-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4c53e5" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#4c53e5" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Quadrants */}
                    <rect x="20" y="20" width="110" height="110" fill="#fca5a5" opacity="0.2" rx="4" />
                    <rect x="150" y="20" width="110" height="110" fill="#fecdd3" opacity="0.2" rx="4" />
                    <rect x="20" y="150" width="110" height="110" fill="#bbf7d0" opacity="0.2" rx="4" />
                    <rect x="150" y="150" width="110" height="110" fill="#fde68a" opacity="0.2" rx="4" />

                    {/* Axes */}
                    <line x1="20" y1="140" x2="260" y2="140" stroke="#334155" strokeWidth="1.5" />
                    <line x1="140" y1="20" x2="140" y2="260" stroke="#334155" strokeWidth="1.5" />

                    {/* Labels */}
                    <text x="75" y="38" fill="#991b1b" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="DM Sans, sans-serif">AUTH. LEFT</text>
                    <text x="205" y="38" fill="#dc2626" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="DM Sans, sans-serif">AUTH. RIGHT</text>
                    <text x="75" y="248" fill="#16a34a" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="DM Sans, sans-serif">LIB. LEFT</text>
                    <text x="205" y="248" fill="#d97706" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="DM Sans, sans-serif">LIB. RIGHT</text>

                    {/* Sample points */}
                    <circle cx="90" cy="90" r="5" fill="#991b1b" opacity="0.5" />
                    <circle cx="195" cy="100" r="5" fill="#dc2626" opacity="0.5" />
                    <circle cx="80" cy="195" r="5" fill="#16a34a" opacity="0.5" />
                    <circle cx="200" cy="190" r="5" fill="#d97706" opacity="0.5" />
                    <circle cx="135" cy="148" r="5" fill="#6b7280" opacity="0.5" />

                    {/* Highlighted point - animated */}
                    <circle cx="110" cy="175" r="12" fill="#4c53e5" opacity="0.1">
                      <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="110" cy="175" r="7" fill="#4c53e5" />
                    <circle cx="110" cy="175" r="2.5" fill="white" />

                    {/* Axis labels */}
                    <text x="140" y="12" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">AUTHORITARIAN</text>
                    <text x="140" y="273" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">LIBERTARIAN</text>
                    <text x="10" y="143" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace" transform="rotate(-90 10 143)">LEFT</text>
                    <text x="270" y="143" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace" transform="rotate(90 270 143)">RIGHT</text>
                  </svg>

                  <div className="absolute bottom-2 right-2 bg-axiom-600 text-white text-xs font-medium px-2.5 py-1 rounded-lg font-mono">
                    Progressive Liberal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AD SLOT (Below Hero) ─────────────────────────────── */}
        <section className="py-4 bg-slate-50">
          <div className="container-narrow">
            <div className="ad-slot" data-ad-slot="below-hero" aria-label="Advertisement">
              {/* AdSense code injected here */}
            </div>
          </div>
        </section>

        {/* ─── SECTIONS PREVIEW ─────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-axiom">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-medium text-axiom-600 uppercase tracking-wider mb-3 font-mono">
                What we cover
              </p>
              <h2 className="heading-lg text-slate-900 mb-4">
                8 domains. 70+ questions.
              </h2>
              <p className="text-slate-600">
                Most quizzes ask 20 questions on obvious topics. AxisIQ covers the full ideological spectrum systematically.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUIZ_SECTIONS.map((section) => (
                <div
                  key={section.id}
                  className="card-solid p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">
                    {
                      {
                        economy: '📊',
                        social: '👥',
                        government: '🏛',
                        environment: '🌿',
                        foreign_policy: '🌍',
                        justice: '⚖️',
                        technology: '💻',
                        culture: '📚',
                      }[section.id]
                    }
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 mb-1">{section.title}</h3>
                  <p className="text-xs text-slate-500">{section.questionCount} questions</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="container-axiom">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-xs font-medium text-axiom-600 uppercase tracking-wider mb-3 font-mono">
                Why AxisIQ
              </p>
              <h2 className="heading-lg text-slate-900 mb-4">
                Better than the Political Compass. Here's why.
              </h2>
              <p className="text-slate-600">
                PoliticalCompass.org hasn't changed in 20 years. 8values is unweighted. AxisIQ was built for 2024.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="card-solid p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-axiom-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-axiom-600" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-axiom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                  <p className="text-xs font-medium text-slate-500">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA SECTION ──────────────────────────────────────── */}
        <section className="py-24 bg-axiom-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container-axiom relative text-center">
            <p className="text-axiom-400 text-sm font-mono uppercase tracking-wider mb-4">
              Ready to find your ideology?
            </p>
            <h2 className="heading-lg text-white mb-6">
              Take the AxisIQ Political Compass Quiz.
            </h2>
            <p className="text-axiom-300 mb-10 max-w-lg mx-auto">
              Free. Anonymous. Takes 10–15 minutes. No account required. Your answers are never stored.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-axiom-900 font-semibold rounded-xl hover:bg-axiom-50 transition-colors shadow-lg"
            >
              Start the Quiz
              <ArrowRight size={18} />
            </Link>
            <p className="text-axiom-500 text-xs mt-4">
              No sign-up. No email required. Completely free.
            </p>
          </div>
        </section>

        {/* ─── SEO CONTENT ──────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container-axiom">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md text-slate-900 mb-6">
                What is the Political Compass?
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-base leading-relaxed">
                <p>
                  The political compass is a two-dimensional framework for mapping political ideologies. Unlike the traditional one-dimensional left–right spectrum, it adds a second axis measuring authoritarian versus libertarian tendencies — giving a far more accurate picture of where someone actually stands politically.
                </p>
                <p>
                  The economic axis (left–right) measures views on the role of markets and the state in the economy: who should own the means of production, how wealth should be distributed, and what the government's role is in regulating business and providing public services.
                </p>
                <p>
                  The social axis (authoritarian–libertarian) measures views on personal freedom and state power: whether individuals should be subject to strong social control and hierarchy, or whether personal autonomy and decentralization should be maximized.
                </p>
                <Link
                  href="/blog/what-is-political-compass"
                  className="inline-flex items-center gap-1 text-axiom-600 font-medium hover:text-axiom-800 transition-colors mt-2"
                >
                  Read the full explainer
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
