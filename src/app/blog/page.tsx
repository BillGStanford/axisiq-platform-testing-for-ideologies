import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/seo'
import { ChevronRight, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Learn — Political Compass Explainers | AxisIQ',
  description: 'In-depth articles explaining the political spectrum, left vs right, authoritarian vs libertarian, and how political compass quizzes work.',
  canonicalPath: '/blog',
})

const ARTICLES = [
  {
    slug: 'what-is-political-compass',
    title: 'What Is the Political Compass?',
    description: 'A comprehensive guide to the two-axis political model — what it measures, its history, and why it\'s more useful than the left–right spectrum alone.',
    readTime: '8 min',
    category: 'Fundamentals',
    featured: true,
  },
  {
    slug: 'left-vs-right',
    title: 'Left vs Right: A Complete Explanation',
    description: 'What does "left" and "right" actually mean in politics? The origins of the distinction, how it has evolved, and what it measures today.',
    readTime: '10 min',
    category: 'Fundamentals',
    featured: true,
  },
  {
    slug: 'authoritarian-vs-libertarian',
    title: 'Authoritarian vs Libertarian: The Social Axis Explained',
    description: 'The second axis of the political compass. What makes a political system authoritarian? What distinguishes libertarian politics? How do these map onto real-world policies?',
    readTime: '9 min',
    category: 'Fundamentals',
    featured: true,
  },
  {
    slug: 'how-accurate-are-political-tests',
    title: 'How Accurate Are Political Tests?',
    description: 'A critical look at political quiz methodology — what they measure well, their inherent limitations, and how to interpret your results intelligently.',
    readTime: '7 min',
    category: 'Methodology',
    featured: false,
  },
  {
    slug: 'guide-to-libertarianism',
    title: 'A Guide to Libertarianism',
    description: 'From classical liberalism to anarcho-capitalism: the intellectual tradition of political libertarianism, its key thinkers, and its modern variants.',
    readTime: '11 min',
    category: 'Ideologies',
    featured: false,
  },
  {
    slug: 'guide-to-socialism',
    title: 'What Is Socialism? A Comprehensive Overview',
    description: 'Democratic socialism, Marxism, social democracy — what unites them, what divides them, and how they map to contemporary politics.',
    readTime: '12 min',
    category: 'Ideologies',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Fundamentals', 'Methodology', 'Ideologies']

export default function BlogPage() {
  const featuredArticles = ARTICLES.filter((a) => a.featured)
  const otherArticles = ARTICLES.filter((a) => !a.featured)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <section className="bg-slate-900 text-white py-16">
          <div className="container-narrow">
            <p className="text-axiom-400 font-mono text-xs uppercase tracking-wider mb-4">Education</p>
            <h1 className="heading-lg text-white mb-4">Learn</h1>
            <p className="text-slate-300 text-lg">
              In-depth explainers on political theory, ideology, and the science of political measurement.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-axiom">
            {/* Featured */}
            <div className="mb-12">
              <h2 className="heading-sm text-slate-900 mb-6">Start Here</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="card-solid p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <span className="inline-block px-2.5 py-0.5 bg-axiom-100 text-axiom-700 text-xs font-medium rounded-full mb-4">
                      {article.category}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 mb-2 group-hover:text-axiom-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={11} />
                        {article.readTime} read
                      </span>
                      <ChevronRight size={14} className="text-axiom-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other articles */}
            <div>
              <h2 className="heading-sm text-slate-900 mb-6">More Articles</h2>
              <div className="space-y-4">
                {otherArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="flex items-start gap-4 p-5 card-solid hover:shadow-md transition-all group"
                  >
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full flex-shrink-0 mt-0.5">
                      {article.category}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-axiom-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-500">{article.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-axiom-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
