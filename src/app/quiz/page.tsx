'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer'
import { QuizProgress, SectionHeader } from '@/components/quiz/QuizProgress'
import { useQuizState } from '@/hooks/useQuizState'
import { encodeResultToUrl } from '@/lib/scoring'
import { QUIZ_SECTIONS } from '@/data/questions'
import { ArrowRight, Compass, Clock } from 'lucide-react'

type QuizPhase = 'intro' | 'active' | 'complete'

export default function QuizPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<QuizPhase>('intro')
  const [completionResult, setCompletionResult] = useState<string>('')

  const {
    state,
    currentQuestion,
    currentSectionQuestions,
    currentSectionData,
    sectionIndex,
    totalSections,
    totalAnswered,
    totalQuestions,
    progressPercentage,
    isFirstQuestion,
    startQuiz,
    answerQuestion,
    goToPreviousQuestion,
    skipQuestion,
    getResults,
  } = useQuizState()

  // When quiz completes, redirect to results
  useEffect(() => {
    if (state.isComplete) {
      const result = getResults()
      const params = encodeResultToUrl(result)
      router.push(`/results?${params}`)
    }
  }, [state.isComplete, getResults, router])

  const handleStart = () => {
    startQuiz()
    setPhase('active')
  }

  if (phase === 'intro') {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container-narrow py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-axiom-600 rounded-2xl mb-6 shadow-lg shadow-axiom-200">
                <Compass className="text-white" size={32} />
              </div>
              <h1 className="heading-lg text-slate-900 mb-4">
                The AxisIQ Political Compass
              </h1>
              <p className="text-lg text-slate-600 mb-2">
                Discover your precise position on the political spectrum.
              </p>
              <p className="text-sm text-slate-500">
                {totalQuestions} questions across {QUIZ_SECTIONS.length} policy domains • ~10–15 minutes
              </p>
            </div>

            {/* What to expect */}
            <div className="card-solid p-6 md:p-8 mb-6">
              <h2 className="font-display font-semibold text-slate-900 mb-4">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '🧭', title: 'Two-axis scoring', desc: 'Economic (left/right) and social (auth/libertarian)' },
                  { icon: '📝', title: 'Multiple question types', desc: 'Likert scales, yes/no, and tradeoff dilemmas' },
                  { icon: '📊', title: 'Detailed ideology profile', desc: 'Rich results with historical context and reading list' },
                  { icon: '🔒', title: 'Fully private', desc: 'No account required. Answers never stored or sold.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections overview */}
            <div className="card-solid p-6 mb-8">
              <h2 className="font-display font-semibold text-slate-900 mb-4">Sections</h2>
              <div className="space-y-2">
                {QUIZ_SECTIONS.map((section, idx) => (
                  <div key={section.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-400 text-sm font-mono w-4">{idx + 1}</span>
                    <span className="font-medium text-slate-800 text-sm flex-1">{section.title}</span>
                    <span className="text-xs text-slate-400">{section.questionCount}q</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">For best results:</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Answer based on your genuine beliefs, not what seems socially acceptable</li>
                <li>• There are no right or wrong answers — this is a mapping exercise, not a test</li>
                <li>• If a question doesn't apply, use "Neutral" or "Skip"</li>
                <li>• Consider the global context, not just your home country</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={handleStart}
                className="btn-primary text-base px-10 py-4 shadow-lg shadow-axiom-200"
              >
                Begin the Quiz
                <ArrowRight size={18} />
              </button>
              <p className="text-xs text-slate-400 mt-3">
                <Clock size={10} className="inline mr-1" />
                Estimated time: 10–15 minutes
              </p>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-axiom-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-narrow py-8">
          {/* Overall Progress */}
          <div className="mb-8">
            <QuizProgress
              sections={QUIZ_SECTIONS}
              currentSection={state.currentSection}
              completedSections={state.completedSections}
              overallProgress={progressPercentage}
            />
          </div>

          {/* Question Card */}
          <div className="card-solid p-6 md:p-8">
            {/* Section Header */}
            {currentSectionData && (
              <SectionHeader
                section={currentSectionData}
                questionIndex={state.currentQuestionIndex}
                totalQuestions={currentSectionQuestions.length}
              />
            )}

            {/* Question */}
            <QuestionRenderer
              question={currentQuestion}
              questionNumber={state.currentQuestionIndex + 1}
              totalInSection={currentSectionQuestions.length}
              onAnswer={answerQuestion}
              onPrevious={goToPreviousQuestion}
              onSkip={skipQuestion}
              canGoBack={!isFirstQuestion}
            />
          </div>

          {/* Ad slot between sections */}
          {state.currentQuestionIndex === 0 && sectionIndex > 0 && (
            <div className="mt-6">
              <div className="ad-slot" data-ad-slot="between-sections" aria-label="Advertisement" />
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            AxisIQ is a non-partisan educational tool. Results are for informational purposes only.
          </p>
        </div>
      </main>
    </>
  )
}
