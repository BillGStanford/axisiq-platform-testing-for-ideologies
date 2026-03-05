import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'FAQ — AxisIQ Political Compass Quiz',
  description: 'Frequently asked questions about the AxisIQ political compass quiz, scoring methodology, and ideology profiles.',
  canonicalPath: '/faq',
})

const FAQS = [
  {
    category: 'About the Quiz',
    items: [
      {
        q: 'How long does the quiz take?',
        a: 'Most people complete AxisIQ in 10–15 minutes. You can skip questions or take breaks — your progress is maintained within the session.',
      },
      {
        q: 'Is the quiz free?',
        a: 'Yes, completely free. No account required, no email, no credit card.',
      },
      {
        q: 'Are my answers stored or tracked?',
        a: 'No. Your answers are processed entirely in your browser and are never sent to our servers. We cannot see, store, or use your individual responses. The only data we collect (optionally) is aggregated, anonymized analytics like page visits and quiz completions.',
      },
      {
        q: 'Can I retake the quiz?',
        a: 'Yes. You can retake it as many times as you like. Each session is independent. Some people find it useful to retake it after reading more about political theory — results can shift as you refine your thinking.',
      },
      {
        q: 'Why do some questions feel loaded or biased?',
        a: 'We work hard to write neutral questions, but no political question is truly neutral — the very act of framing a political question involves choices. If you believe a specific question is biased, we welcome feedback. We periodically audit questions using independent reviewers.',
      },
    ],
  },
  {
    category: 'Scoring & Results',
    items: [
      {
        q: 'What do the two axes mean?',
        a: 'The horizontal axis measures economic views: left (collective ownership, redistribution, regulation) to right (free markets, private property, minimal intervention). The vertical axis measures social views: authoritarian (strong state, hierarchy, social control) to libertarian (personal freedom, decentralization, autonomy).',
      },
      {
        q: "Why don't I agree with everything in my ideology result?",
        a: "Ideology labels are broad categories that encompass a range of specific positions. You might score as 'Progressive' while disagreeing with some progressive positions — this is normal. Your exact coordinate position matters more than the label. Read the 'Similar Ideologies' section to see which nearby ideologies might fit better.",
      },
      {
        q: 'What is the confidence score?',
        a: 'Confidence measures how consistent your answers are across related questions. High confidence (85%+) means your answers are internally consistent and the ideology label is a reliable summary. Lower confidence (50–70%) may mean you hold genuinely cross-ideological views, or that the questions caught some genuine ambivalence.',
      },
      {
        q: 'How does AxisIQ compare to PoliticalCompass.org?',
        a: "PoliticalCompass.org uses about 62 questions with limited question types and has not significantly updated its methodology or question bank in many years. AxisIQ uses weighted scoring, multiple question types, a confidence algorithm, bias correction, and provides far richer result profiles. We've also published our full methodology — PoliticalCompass.org has not.",
      },
      {
        q: 'My result seems wrong. What should I do?',
        a: "First, check your exact coordinate scores — these are more precise than the label. Read the 'Similar Ideologies' section. If you genuinely disagree, retake the quiz and focus on answering instinctively rather than analytically. If you still disagree, consider that your political views may be more complex than any two-axis model can capture — that's a feature of political reality, not a bug in our quiz.",
      },
    ],
  },
  {
    category: 'Ideology & Politics',
    items: [
      {
        q: 'Is any ideology presented as better or worse?',
        a: "No. We present all ideologies with equal intellectual seriousness, including their critiques. We intentionally include a 'Common Critiques' section for every ideology. AxisIQ takes no position on which ideology is correct.",
      },
      {
        q: "Why is [ideology] included / not included?",
        a: "We include ideologies that have significant intellectual traditions, historical relevance, or contemporary political presence. We're continuously expanding our library. If you believe a major ideology is missing or misrepresented, contact us with specifics.",
      },
      {
        q: 'The political figures listed for my ideology include people I find objectionable. Why?',
        a: "The figures listed are those historically associated with an ideology, not necessarily endorsements. We include figures to provide historical and political context. A figure being listed under an ideology doesn't mean they are role models — it means they are associated with that political tradition. All figures are listed for educational purposes.",
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'Can I share my results?',
        a: "Yes. Your results page generates a unique URL containing your scores encoded as URL parameters. No personal data is in this URL — it only contains your numeric scores and matched ideology. Sharing the link lets others see your result.",
      },
      {
        q: 'Does AxisIQ work on mobile?',
        a: 'Yes. AxisIQ is fully responsive and optimized for mobile devices.',
      },
      {
        q: 'Is AxisIQ open source?',
        a: 'Not currently, though we are considering it. Our methodology is fully documented publicly.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="bg-slate-900 text-white py-16">
          <div className="container-narrow">
            <p className="text-axiom-400 font-mono text-xs uppercase tracking-wider mb-4">Help</p>
            <h1 className="heading-lg text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-slate-300">Everything you need to know about AxisIQ.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-narrow space-y-12">
            {FAQS.map((category) => (
              <div key={category.category}>
                <h2 className="heading-sm text-slate-900 mb-6 pb-3 border-b border-slate-200">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.items.map((faq) => (
                    <div key={faq.q} className="pb-6 border-b border-slate-100 last:border-0">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-axiom-50 rounded-2xl p-6 text-center">
              <p className="text-slate-700 mb-4">Still have questions? We're happy to help.</p>
              <p className="text-sm text-slate-500 mb-4">
                Email: <span className="text-axiom-600 font-medium">contact@axisiq.app</span>
              </p>
              <Link href="/quiz" className="btn-primary inline-flex">
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
