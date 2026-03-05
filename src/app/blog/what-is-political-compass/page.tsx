import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata, getArticleJsonLd } from '@/lib/seo'
import { ArrowRight, Clock, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'What Is the Political Compass? A Complete Guide',
  description: 'A comprehensive guide to the two-axis political compass model — what it measures, its history, limitations, and why it\'s more useful than left vs right alone.',
  canonicalPath: '/blog/what-is-political-compass',
  keywords: ['political compass', 'political spectrum', 'left right politics', 'authoritarian libertarian'],
  type: 'article',
})

export default function WhatIsPoliticalCompassPage() {
  const jsonLd = getArticleJsonLd({
    title: 'What Is the Political Compass? A Complete Guide',
    description: 'A comprehensive guide to the two-axis political model.',
    slug: 'what-is-political-compass',
    publishedAt: '2024-01-15',
    updatedAt: '2024-12-01',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Article Header */}
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="container-narrow">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono">
              <Link href="/blog" className="hover:text-axiom-600 transition-colors">Learn</Link>
              <ChevronRight size={12} />
              <span>Fundamentals</span>
            </div>
            <h1 className="heading-lg text-slate-900 mb-4">
              What Is the Political Compass?
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              The political compass is a two-dimensional framework for mapping political ideologies. It goes far beyond the traditional left–right spectrum, revealing the full complexity of political belief.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock size={11} /> 8 min read</span>
              <span>Updated December 2024</span>
              <span className="px-2 py-0.5 bg-axiom-100 text-axiom-700 rounded-full">Fundamentals</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container-narrow">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">

              <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">The Problem with Left and Right</h2>
              <p>
                For most of the 20th century, the political spectrum was understood as a single line running from "left" to "right." This framework emerged from the French National Assembly of 1789, where supporters of the king sat to the right of the president and revolutionaries sat to the left.
              </p>
              <p className="mt-4">
                But a single line cannot capture the complexity of real political belief. How do you place libertarians — who favor free markets (traditionally "right") but also personal freedoms like drug legalization (traditionally "left")? Or Christian socialists, who combine economic redistribution with social conservatism? The traditional spectrum forces them into an impossible position.
              </p>

              <h2 className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4">The Two-Axis Model</h2>
              <p>
                The political compass adds a second dimension, producing a two-axis grid that captures far more of political reality:
              </p>

              <div className="bg-slate-50 rounded-xl p-6 my-6 not-prose">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Economic Axis (Horizontal)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Measures your views on the economy. The <strong>left</strong> favors collective ownership, redistribution, state intervention, and regulation. The <strong>right</strong> favors private property, free markets, lower taxes, and minimal economic regulation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Social Axis (Vertical)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Measures your views on personal freedom and state power. <strong>Authoritarian</strong> positions favor strong government, social control, and hierarchy. <strong>Libertarian</strong> positions favor personal autonomy, decentralization, and minimal state interference in private life.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                This creates four distinct quadrants, each representing a recognizable family of political thought:
              </p>

              <div className="grid grid-cols-2 gap-3 my-6 not-prose">
                {[
                  { label: 'Authoritarian Left', desc: 'State socialism, communism, social authoritarianism', color: '#991b1b', bg: '#fef2f2' },
                  { label: 'Authoritarian Right', desc: 'Fascism, nationalism, conservative authoritarianism', color: '#dc2626', bg: '#fff1f2' },
                  { label: 'Libertarian Left', desc: 'Anarchism, green politics, progressive liberalism', color: '#16a34a', bg: '#f0fdf4' },
                  { label: 'Libertarian Right', desc: 'Libertarianism, classical liberalism, anarcho-capitalism', color: '#d97706', bg: '#fffbeb' },
                ].map((q) => (
                  <div key={q.label} className="p-4 rounded-xl border" style={{ borderColor: q.color + '30', background: q.bg }}>
                    <p className="font-semibold text-sm mb-1" style={{ color: q.color }}>{q.label}</p>
                    <p className="text-xs text-slate-600">{q.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4">History of the Political Compass</h2>
              <p>
                The two-axis model has intellectual roots going back at least to Hans Eysenck's 1954 book <em>The Psychology of Politics</em>, which proposed measuring political attitudes on both a "radical–conservative" and a "tough-minded–tender-minded" dimension.
              </p>
              <p className="mt-4">
                The modern political compass concept was popularized by the website PoliticalCompass.org, launched in 2001. While groundbreaking for its time, it has not substantially updated its methodology in over two decades. AxisIQ was built to apply modern social science rigor to the same fundamental framework.
              </p>

              <h2 className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4">Limitations of the Model</h2>
              <p>
                The political compass is a powerful tool, but it has real limitations that any honest user should understand:
              </p>
              <ul className="mt-4 space-y-3 list-none not-prose">
                {[
                  { title: 'It\'s a simplification', desc: 'Real political space is multi-dimensional. Two axes cannot capture every nuance of political belief.' },
                  { title: 'Self-reporting bias', desc: 'People answer surveys based on what they want to believe about themselves, not always their actual positions.' },
                  { title: 'Cultural context', desc: 'What counts as "left" or "authoritarian" varies across countries and historical periods.' },
                  { title: 'Ideological fluidity', desc: 'Political beliefs change over time. A quiz captures a snapshot, not a permanent identity.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <span className="text-amber-500 font-bold">!</span>
                    <div>
                      <strong className="text-slate-800 text-sm">{item.title}:</strong>{' '}
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4">How AxisIQ Improves on the Standard Model</h2>
              <p>
                AxisIQ applies several methodological improvements over older political compass quizzes:
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><strong>Weighted scoring:</strong> Questions are weighted by their ideological discriminatory power — more diagnostic questions carry more weight.</li>
                <li><strong>Multiple question types:</strong> Likert scales, yes/no questions, and tradeoff dilemmas each capture different aspects of political belief.</li>
                <li><strong>Confidence scoring:</strong> We report how internally consistent your answers are, giving you a reliability indicator for your result.</li>
                <li><strong>Anti-bias correction:</strong> A modest correction factor accounts for the well-documented tendency of survey respondents to moderate their stated views.</li>
                <li><strong>Transparent methodology:</strong> Everything above is documented publicly. You can evaluate and critique our methods.</li>
              </ul>

              <div className="bg-axiom-50 border border-axiom-200 rounded-2xl p-6 mt-10 not-prose">
                <p className="font-display font-bold text-axiom-900 text-lg mb-2">Ready to find your position?</p>
                <p className="text-axiom-700 text-sm mb-4">
                  Take the AxisIQ quiz — 70+ questions, transparent scoring, rich ideology profiles.
                </p>
                <Link href="/quiz" className="btn-primary inline-flex">
                  Take the Quiz
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>

            {/* Related */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h3 className="font-display font-bold text-slate-900 mb-4">Continue Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { href: '/blog/left-vs-right', title: 'Left vs Right: A Complete Explanation' },
                  { href: '/blog/authoritarian-vs-libertarian', title: 'Authoritarian vs Libertarian: The Social Axis Explained' },
                ].map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="flex items-center justify-between p-4 card-solid hover:shadow-md transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-800 group-hover:text-axiom-700 transition-colors">
                      {article.title}
                    </span>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-axiom-500 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
