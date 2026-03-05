import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Left vs Right: A Complete Explanation | AxisIQ',
  description: 'What does left and right actually mean in politics? The origins, evolution, and modern meaning of the left-right political spectrum.',
  canonicalPath: '/blog/left-vs-right',
  type: 'article',
})

export default function LeftVsRightPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="container-narrow">
            <h1 className="heading-lg text-slate-900 mb-4">Left vs Right: A Complete Explanation</h1>
            <p className="text-lg text-slate-600">What does "left" and "right" actually mean in politics — and where did these terms come from?</p>
          </div>
        </section>
        <article className="py-16">
          <div className="container-narrow prose prose-slate max-w-none">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Origins: The French Revolution</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The terms "left" and "right" in politics date to the French National Assembly of 1789. Supporters of the royal veto and the established order sat to the right of the Assembly president. Opponents — those favoring revolution and popular sovereignty — sat to the left. What began as a seating arrangement became the dominant framework for understanding political difference.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">What the Economic Left Believes</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Economically left positions favor collective or state ownership of at least some means of production, redistribution of wealth through taxation, regulation of markets to prevent exploitation, strong labor rights and unions, and robust public services like healthcare and education. The unifying theme is that markets left to themselves produce unjust outcomes that require collective correction.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">What the Economic Right Believes</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Economically right positions favor private ownership of the means of production, low taxation especially on capital and high earners, minimal regulation of markets, flexible labor markets, and limited public services. The unifying theme is that voluntary exchange in free markets produces the best outcomes for all, and that government intervention distorts this.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">Why Left and Right Aren't Enough</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The economic left–right axis captures important differences, but it misses the social dimension entirely. A libertarian who favors both free markets and personal freedoms, and an authoritarian who favors both state economic control and social control, cannot be accurately placed on a single line. This is why the two-axis political compass is far more informative.
            </p>

            <div className="bg-axiom-50 border border-axiom-200 rounded-2xl p-6 mt-10 not-prose">
              <p className="font-display font-bold text-axiom-900 text-lg mb-2">Discover where you stand</p>
              <Link href="/quiz" className="btn-primary inline-flex">
                Take the AxisIQ Quiz <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
