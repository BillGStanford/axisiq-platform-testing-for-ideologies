import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'About AxisIQ — The Political Compass Quiz, Reimagined',
  description: 'About AxisIQ: our mission, values, and commitment to non-partisan political education.',
  canonicalPath: '/about',
})

const DIFFERENTIATORS = [
  {
    title: 'Research-backed questions',
    desc: '70+ questions designed to minimize bias and maximize ideological discrimination.',
  },
  {
    title: 'Transparent methodology',
    desc: 'Every scoring decision is documented. Read our full methodology page.',
  },
  {
    title: 'No political affiliation',
    desc: "We don't take sides. We present ideologies fairly, including their critiques.",
  },
  {
    title: 'Rich educational content',
    desc: 'Detailed ideology profiles with thinkers, readings, and historical context.',
  },
  {
    title: 'No data collection',
    desc: 'Your answers are never stored, sold, or used for targeting. Fully private.',
  },
  {
    title: 'Global perspective',
    desc: 'We cover political traditions from across the world, not just Anglo-American politics.',
  },
]

const VALUES = [
  {
    title: 'Intellectual honesty',
    desc: 'We present all ideologies with equal rigor — including their internal critiques and historical failures. No ideology gets a free pass.',
  },
  {
    title: 'Methodological transparency',
    desc: 'We publish our full scoring methodology so users can evaluate and critique it. Opacity is the enemy of trust.',
  },
  {
    title: 'Educational mission first',
    desc: 'AxisIQ is a learning tool, not a political instrument. We will never accept funding from political organizations or allow our results to be used for political targeting.',
  },
  {
    title: 'Privacy by design',
    desc: 'We collect no personal data. We store no quiz answers. We use no tracking that could identify individual users. Your political beliefs are your own.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Header */}
        <section className="bg-axiom-950 text-white py-16 md:py-20">
          <div className="container-narrow">
            <p className="text-axiom-400 font-mono text-xs uppercase tracking-wider mb-4">About</p>
            <h1 className="heading-lg text-white mb-4">Built for political clarity.</h1>
            <p className="text-axiom-300 text-lg leading-relaxed">
              AxisIQ was created because existing political quizzes weren't good enough. Most are opaque, biased, or designed to entertain rather than inform. We built something better.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-narrow space-y-14">

            {/* Mission */}
            <div>
              <h2 className="heading-sm text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                AxisIQ exists to help people understand political ideologies clearly, fairly, and without partisan bias. We believe that political self-understanding is a civic good — that citizens who can accurately place themselves on the political spectrum are better equipped to engage in democratic life.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Most political quizzes are poorly designed: questions are loaded, scoring is opaque, results are oversimplified, and the underlying methodology is never disclosed. AxisIQ was built as an antidote — a platform that takes political education seriously.
              </p>
            </div>

            {/* Differentiators */}
            <div>
              <h2 className="heading-sm text-slate-900 mb-6">What Makes AxisIQ Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIFFERENTIATORS.map((item) => (
                  <div key={item.title} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="heading-sm text-slate-900 mb-6">Our Values</h2>
              <div className="space-y-6">
                {VALUES.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-axiom-500 mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{value.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-partisan statement */}
            <div className="bg-axiom-50 border border-axiom-200 rounded-2xl p-6 md:p-8">
              <h2 className="font-display font-bold text-axiom-900 mb-3">Non-Partisan Statement</h2>
              <p className="text-axiom-800 text-sm leading-relaxed mb-3">
                AxisIQ is operated as a strictly non-partisan educational platform. We have no political affiliation with any party, candidate, movement, or ideology. We do not accept funding from political organizations, campaigns, PACs, or ideologically-motivated donors.
              </p>
              <p className="text-axiom-800 text-sm leading-relaxed">
                Our quiz results are derived from a transparent mathematical scoring algorithm, not editorial judgment. We present critiques of every ideology, including those our team members might personally favor. If you believe our questions or results are systematically biased, we want to hear from you.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="heading-sm text-slate-900 mb-4">Contact</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We welcome substantive feedback on our methodology, question design, and ideology profiles. If you're a political scientist, researcher, or educator with critiques or suggestions, we take these seriously.
              </p>
              <p className="text-slate-600 text-sm">
                Email: <span className="text-axiom-600 font-medium">contact@axisiq.app</span>
              </p>
            </div>

            {/* CTA */}
            <div className="text-center pt-4 border-t border-slate-100">
              <Link href="/quiz" className="btn-primary text-base px-8 py-3.5">
                Take the Quiz
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
