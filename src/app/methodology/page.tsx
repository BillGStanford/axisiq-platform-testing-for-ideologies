import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Methodology — How AxisIQ Scores Your Political Position',
  description: 'Full transparency on how AxisIQ calculates your political compass position: weighting, normalization, confidence scoring, and ideology matching.',
  canonicalPath: '/methodology',
})

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Overview',
    content: `AxisIQ uses a two-axis scoring system to map your political position. The economic axis (horizontal) runs from left (collective ownership, redistribution, regulated markets) to right (free markets, private property, minimal intervention). The social axis (vertical) runs from authoritarian (strong state, hierarchy, social control) to libertarian (personal freedom, decentralization, autonomy).

Each quiz answer contributes to both axes with different weights. The final position is a weighted sum of all contributions, normalized to a -100 to +100 scale on each axis.`,
  },
  {
    id: 'questions',
    title: '2. Question Design',
    content: `AxisIQ uses four question types:

• Likert 7-point Scale: "Strongly Agree" to "Strongly Disagree" on a statement. Responses map to values from +3 (strongly agree) to -3 (strongly disagree) with 0 as neutral.

• Yes/No Binary: Simple binary questions where "Yes" maps to +3 and "No" to -3 on the question's stated direction.

• Tradeoff Questions: Choose between two positions that represent genuine value conflicts. Each option has its own axis effects — selecting the option directly applies its weights.

• Priority Ranking: Order items by priority. Position in ranking determines effect magnitude.

All questions are reviewed to minimize leading language and cultural bias. We periodically audit questions using linguistic analysis.`,
  },
  {
    id: 'weighting',
    title: '3. Weighting System',
    content: `Each question has two weights:

Question Weight (1.0–2.0): Questions with higher political diagnostic value — i.e., those that most reliably distinguish between ideological positions — receive higher weights. This is calibrated against academic research on ideology measurement.

Section Weight (0.8–1.5): Certain policy domains are more ideologically "loaded" than others. Economy and governance receive the highest section weights (1.5, 1.4) as they most directly operationalize left/right and authoritarian/libertarian dimensions. Technology receives a lower weight (0.8) as its political mapping is less settled.

The final contribution of each answer to each axis is:
  response_value × question_axis_effect × question_weight × section_weight`,
  },
  {
    id: 'normalization',
    title: '4. Normalization & Anti-Bias Correction',
    content: `Raw scores are normalized to -100/+100 by dividing by the maximum theoretically possible score on each axis. This produces scale-independent results comparable across different quiz versions.

We apply a modest Anti-Extreme Bias Correction (factor: 0.92). Research in political psychology consistently finds that survey respondents understate the intensity of their views — especially on socially sensitive topics — due to social desirability bias. This factor pulls extreme scores slightly toward center to correct for this effect.

This correction is intentionally conservative and transparent. We do not apply corrections large enough to meaningfully shift ideology assignments.`,
  },
  {
    id: 'confidence',
    title: '5. Confidence Score',
    content: `The confidence score measures internal consistency across your answers. It is calculated as:

  confidence = 100 − (normalized_standard_deviation × 60)

If your answers on related questions are highly consistent (e.g., you favor free markets economically and oppose regulation across multiple questions), your confidence will be high (85–100%). If your answers are contradictory across related questions, confidence will be lower (50–70%).

A lower confidence score doesn't mean your result is "wrong" — it may reflect genuine cross-ideological views. However, it does indicate that a single ideological label is a less accurate summary of your position.`,
  },
  {
    id: 'ideology-matching',
    title: '6. Ideology Matching',
    content: `Once your position is calculated, AxisIQ matches you to an ideology profile using minimum Euclidean distance from ideology centroids.

Each ideology has an economic and social range defined by expert review. The centroid is the midpoint of this range. Your ideology is the one whose centroid is closest to your position in 2D space.

When your position falls near the boundary between ideologies, the result will show ideologies on both sides as "similar ideologies." The confidence score will typically be lower in these border cases.

Note: Ideology labels are simplifications of complex philosophical traditions. Your exact position may not perfectly match any single label — this is intentional and reflects the genuine complexity of political thought.`,
  },
  {
    id: 'percentile',
    title: '7. Population Percentile',
    content: `Your percentile position is estimated against a synthetic population distribution calibrated to quiz-taking populations (which skew slightly left-libertarian compared to general populations).

The distribution parameters are:
• Economic axis: Mean ≈ -5, SD ≈ 35 (slightly left of center)
• Social axis: Mean ≈ -10, SD ≈ 30 (slightly libertarian)

These parameters are estimates based on publicly available data from comparable quiz platforms and academic surveys. They are not derived from AxisIQ user data.`,
  },
  {
    id: 'limitations',
    title: '8. Known Limitations',
    content: `AxisIQ is a self-reported survey instrument, not a psychometric test. Its scores should be interpreted as a rough mapping of political preferences, not a precise measurement.

Key limitations:

• Survey bias: Responses reflect what participants are willing to report, not necessarily their true beliefs.

• Cultural context: Some questions may land differently across national contexts. We attempt to write questions that are internationally applicable but cannot fully neutralize cultural framing.

• Ideological fluidity: Political beliefs change over time and in different contexts. A single quiz captures a snapshot.

• Dimensionality: Two axes are a simplification. Real political space is multi-dimensional. Some ideologies (e.g., libertarian socialism, religious left) don't map cleanly to a 2D grid.

We are committed to ongoing improvement of the methodology. If you have substantive critiques, please contact us.`,
  },
]

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Header */}
        <section className="bg-slate-900 text-white py-16 md:py-20">
          <div className="container-narrow">
            <p className="text-axiom-400 font-mono text-xs uppercase tracking-wider mb-4">Transparency</p>
            <h1 className="heading-lg text-white mb-4">Methodology</h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Full documentation of how AxisIQ scores your political position. We believe transparency is a prerequisite for credibility.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-narrow">
            {/* Table of contents */}
            <div className="card-solid p-5 mb-10">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Contents</h2>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-axiom-600 hover:text-axiom-800 py-0.5 transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="heading-sm text-slate-900 mb-4 pb-3 border-b border-slate-200">
                    {section.title}
                  </h2>
                  <div className="prose prose-slate text-slate-700 text-base leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Version note */}
            <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Methodology Version:</strong> 1.0 · Last updated: January 2025 · AxisIQ reserves the right to update scoring methodology. Major changes will be documented and communicated transparently.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
