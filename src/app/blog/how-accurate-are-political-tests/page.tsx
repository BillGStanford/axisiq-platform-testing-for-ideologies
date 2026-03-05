import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'How Accurate Are Political Tests? | AxisIQ',
  description: 'A critical look at political quiz methodology — what they measure well, their inherent limitations, and how to interpret your results intelligently.',
  canonicalPath: '/blog/how-accurate-are-political-tests',
  type: 'article',
})

export default function AccuracyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="container-narrow">
            <h1 className="heading-lg text-slate-900 mb-4">How Accurate Are Political Tests?</h1>
            <p className="text-lg text-slate-600">A critical look at what political quizzes measure well, where they fail, and how to use your results wisely.</p>
          </div>
        </section>
        <article className="py-16">
          <div className="container-narrow prose prose-slate max-w-none space-y-6">
            <h2 className="font-display text-2xl font-bold text-slate-900">The Short Answer</h2>
            <p className="text-slate-700 leading-relaxed">
              Political tests are useful but imperfect. They are good at giving you a rough map of your political tendencies. They are bad at capturing nuance, cross-ideological views, or your actual behavior as a voter or citizen. Like any self-reported survey, they measure what you <em>think</em> you believe, filtered through the specific questions asked.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8">What They Measure Well</h2>
            <p className="text-slate-700 leading-relaxed">
              Well-designed political tests reliably identify broad ideological tendencies: whether you lean toward collective or individual solutions, whether you favor authority or autonomy, whether you are economically interventionist or laissez-faire. They are good for comparative purposes — seeing how your position relates to others — and as starting points for political self-reflection.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Research in political psychology consistently finds that self-reported ideology correlates meaningfully with voting behavior, policy preferences, and even personality traits. Political quizzes tap into real and stable dimensions of political belief.
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8">Known Limitations</h2>
            <div className="space-y-4">
              {[
                { title: 'Social desirability bias', desc: 'People systematically answer in the direction they believe is socially acceptable, not their genuine view. AxisIQ\'s anti-extreme correction partly addresses this.' },
                { title: 'Question framing effects', desc: 'How a question is worded dramatically affects how people answer it. No framing is fully neutral.' },
                { title: 'Context dependence', desc: 'People\'s political views shift depending on their current news diet, recent events, and mood. A quiz captures a snapshot.' },
                { title: 'Abstract vs applied preferences', desc: 'People often hold abstract principles (e.g., "I believe in equality") that conflict with their concrete policy preferences.' },
                { title: 'Dimensionality limits', desc: 'Two axes cannot capture all ideological variation. Some people hold genuinely cross-cutting views that no label fits well.' },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-amber-50 border border-amber-100 rounded-xl not-prose">
                  <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold text-slate-900 mt-8">How to Use Your Results Well</h2>
            <p className="text-slate-700 leading-relaxed">
              Treat your result as a starting point, not a destination. Read the ideology profile with genuine curiosity — including the critiques section. If something doesn't fit, explore the "similar ideologies" to find a closer match. Most importantly, use the quiz as a prompt for deeper political reading and reflection, not as a label to adopt uncritically.
            </p>

            <div className="bg-axiom-50 border border-axiom-200 rounded-2xl p-6 mt-10 not-prose">
              <p className="font-display font-bold text-axiom-900 text-lg mb-2">See our full methodology</p>
              <p className="text-axiom-700 text-sm mb-4">AxisIQ publishes complete documentation of how we score questions, weight sections, and match ideologies.</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/methodology" className="btn-primary inline-flex">Read Methodology <ArrowRight size={16} /></Link>
                <Link href="/quiz" className="btn-secondary inline-flex">Take the Quiz</Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
