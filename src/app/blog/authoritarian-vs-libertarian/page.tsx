import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Authoritarian vs Libertarian: The Social Axis Explained | AxisIQ',
  description: 'What makes a political system authoritarian or libertarian? A complete guide to the social axis of the political compass.',
  canonicalPath: '/blog/authoritarian-vs-libertarian',
  type: 'article',
})

export default function AuthVsLibPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="container-narrow">
            <h1 className="heading-lg text-slate-900 mb-4">Authoritarian vs Libertarian: The Social Axis Explained</h1>
            <p className="text-lg text-slate-600">The vertical axis of the political compass — what it measures, why it matters, and how it cuts across left and right.</p>
          </div>
        </section>
        <article className="py-16">
          <div className="container-narrow prose prose-slate max-w-none">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">The Second Dimension of Politics</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Traditional political analysis focuses almost entirely on the economic left–right axis. But equally important is the social axis: the spectrum from authoritarian to libertarian political philosophy. This axis measures a politician's or citizen's attitude toward state power over individuals, social hierarchy, and personal freedom.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">What Authoritarian Means</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Authoritarian political positions hold that strong state power, social hierarchy, and strict order are necessary for a functioning society. Authoritarians tend to favor:
            </p>
            <ul className="space-y-2 text-slate-700 text-sm mb-6">
              <li>• Strong central government with extensive powers</li>
              <li>• Robust law enforcement and criminal justice systems with harsh penalties</li>
              <li>• Restrictions on speech, press, and assembly when deemed necessary for social order</li>
              <li>• Deference to traditional institutions: church, military, monarchy, family</li>
              <li>• Surveillance and security measures prioritized over privacy</li>
              <li>• Strict immigration controls and cultural conformity</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">What Libertarian Means</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Libertarian political positions hold that individual freedom is the paramount political value and that state power is a constant threat to it. Libertarians tend to favor:
            </p>
            <ul className="space-y-2 text-slate-700 text-sm mb-6">
              <li>• Minimal government interference in personal life</li>
              <li>• Decriminalization or legalization of victimless crimes</li>
              <li>• Strong civil liberties: free speech, press freedom, right to privacy</li>
              <li>• Skepticism of surveillance, military expansion, and emergency powers</li>
              <li>• Open borders or liberal immigration</li>
              <li>• Localism and decentralization over centralized authority</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4">Why This Cuts Across Left and Right</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The social axis is largely independent of the economic axis. This produces some surprising combinations. Libertarian socialists — like anarchists — combine far-left economics with anti-statism. Authoritarian capitalists — like some East Asian developmental states — combine pro-market economics with strict social control. These positions are incoherent on a one-dimensional left–right spectrum but map cleanly onto the two-axis compass.
            </p>

            <div className="bg-axiom-50 border border-axiom-200 rounded-2xl p-6 mt-10 not-prose">
              <p className="font-display font-bold text-axiom-900 text-lg mb-2">Find your position on both axes</p>
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
