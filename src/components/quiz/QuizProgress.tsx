'use client'

import { CheckCircle2, Circle } from 'lucide-react'
import type { QuizSection, SectionId } from '@/types'
import { cn } from '@/lib/utils'

interface QuizProgressProps {
  sections: QuizSection[]
  currentSection: SectionId
  completedSections: SectionId[]
  overallProgress: number
}

const SECTION_ICONS: Record<string, string> = {
  economy: '📊',
  social: '👥',
  government: '🏛',
  environment: '🌿',
  foreign_policy: '🌍',
  justice: '⚖️',
  technology: '💻',
  culture: '📚',
}

export function QuizProgress({
  sections,
  currentSection,
  completedSections,
  overallProgress,
}: QuizProgressProps) {
  return (
    <div className="w-full">
      {/* Overall progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-500 font-mono">Overall Progress</span>
          <span className="text-xs font-bold text-axiom-600 font-mono">{overallProgress}%</span>
        </div>
        <div className="progress-track h-2">
          <div
            className="progress-fill h-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Section indicators */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {sections.map((section, idx) => {
          const isComplete = completedSections.includes(section.id)
          const isCurrent = section.id === currentSection
          const isPending = !isComplete && !isCurrent

          return (
            <div
              key={section.id}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-shrink-0',
                isComplete && 'bg-green-100 text-green-700',
                isCurrent && 'bg-axiom-100 text-axiom-700 shadow-sm',
                isPending && 'text-slate-400'
              )}
            >
              {isComplete ? (
                <CheckCircle2 size={12} className="text-green-600" />
              ) : (
                <span className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  isCurrent && 'bg-axiom-500',
                  isPending && 'bg-slate-200'
                )} />
              )}
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{SECTION_ICONS[section.id]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  section: QuizSection
  questionIndex: number
  totalQuestions: number
}

export function SectionHeader({ section, questionIndex, totalQuestions }: SectionHeaderProps) {
  const progress = Math.round(((questionIndex) / totalQuestions) * 100)

  return (
    <div className="mb-6 pb-6 border-b border-slate-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl">{SECTION_ICONS[section.id]}</div>
        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono mb-0.5">
            Section
          </div>
          <h3 className="font-display font-semibold text-slate-900">
            {section.title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-3">{section.description}</p>

      {/* Section progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-slate-100 rounded-full">
          <div
            className="h-full bg-axiom-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 font-mono flex-shrink-0">
          {questionIndex}/{totalQuestions}
        </span>
      </div>
    </div>
  )
}
