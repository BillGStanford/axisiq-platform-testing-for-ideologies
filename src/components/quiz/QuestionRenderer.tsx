'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, SkipForward, HelpCircle } from 'lucide-react'
import type { Question } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionRendererProps {
  question: Question
  questionNumber: number
  totalInSection: number
  onAnswer: (value: number, rawResponse: string | number | string[]) => void
  onPrevious: () => void
  onSkip: () => void
  canGoBack: boolean
}

const LIKERT_LABELS = [
  { value: 1, label: 'Strongly\nAgree', shortLabel: 'Str. Agree' },
  { value: 2, label: 'Agree', shortLabel: 'Agree' },
  { value: 3, label: 'Slightly\nAgree', shortLabel: 'Sl. Agree' },
  { value: 4, label: 'Neutral', shortLabel: 'Neutral' },
  { value: 5, label: 'Slightly\nDisagree', shortLabel: 'Sl. Disagree' },
  { value: 6, label: 'Disagree', shortLabel: 'Disagree' },
  { value: 7, label: 'Strongly\nDisagree', shortLabel: 'Str. Disagree' },
]

const LIKERT_VALUES_MAP: Record<number, number> = {
  1: 3, 2: 2, 3: 1, 4: 0, 5: -1, 6: -2, 7: -3,
}

const LIKERT_COLORS = [
  'hover:border-green-400 hover:bg-green-50 data-[selected=true]:border-green-500 data-[selected=true]:bg-green-50 data-[selected=true]:text-green-700',
  'hover:border-green-300 hover:bg-green-50/70 data-[selected=true]:border-green-400 data-[selected=true]:bg-green-50/70 data-[selected=true]:text-green-600',
  'hover:border-emerald-300 hover:bg-emerald-50 data-[selected=true]:border-emerald-400 data-[selected=true]:bg-emerald-50 data-[selected=true]:text-emerald-600',
  'hover:border-slate-300 hover:bg-slate-50 data-[selected=true]:border-slate-400 data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-700',
  'hover:border-orange-200 hover:bg-orange-50 data-[selected=true]:border-orange-400 data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700',
  'hover:border-red-300 hover:bg-red-50 data-[selected=true]:border-red-400 data-[selected=true]:bg-red-50 data-[selected=true]:text-red-700',
  'hover:border-red-400 hover:bg-red-50 data-[selected=true]:border-red-500 data-[selected=true]:bg-red-50 data-[selected=true]:text-red-800',
]

export function QuestionRenderer({
  question,
  questionNumber,
  totalInSection,
  onAnswer,
  onPrevious,
  onSkip,
  canGoBack,
}: QuestionRendererProps) {
  const [selected, setSelected] = useState<string | number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset selection when question changes
  useEffect(() => {
    setSelected(null)
    setIsAnimating(false)
  }, [question.id])

  const handleSelect = (value: string | number) => {
    setSelected(value)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setIsAnimating(true)

    let numericValue = 0
    let rawResponse: string | number | string[] = selected

    if (question.type === 'likert7') {
      numericValue = LIKERT_VALUES_MAP[selected as number] ?? 0
    } else if (question.type === 'yesno') {
      numericValue = selected === 'yes' ? 3 : -3
    } else if (question.type === 'tradeoff') {
      numericValue = selected === 'a' ? 3 : -3
    }

    setTimeout(() => {
      onAnswer(numericValue, rawResponse)
      setIsAnimating(false)
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selected !== null) handleConfirm()
    if (e.key === 'ArrowLeft' && canGoBack) onPrevious()
  }

  return (
    <div
      className={cn(
        'transition-all duration-300',
        isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Question header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
            Question {questionNumber} of {totalInSection}
          </span>
          <button
            onClick={onSkip}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            title="Skip this question"
          >
            <SkipForward size={12} />
            Skip
          </button>
        </div>

        <h2 className="text-xl md:text-2xl font-display font-semibold text-slate-900 leading-snug">
          {question.text}
        </h2>

        {question.subtext && (
          <p className="mt-2 text-sm text-slate-500 flex items-start gap-1.5">
            <HelpCircle size={14} className="mt-0.5 flex-shrink-0" />
            {question.subtext}
          </p>
        )}
      </div>

      {/* Answer area */}
      <div className="space-y-4">
        {question.type === 'likert7' && (
          <LikertScale
            selected={selected as number | null}
            onSelect={handleSelect}
          />
        )}

        {question.type === 'yesno' && (
          <YesNoOptions
            selected={selected as string | null}
            onSelect={handleSelect}
          />
        )}

        {question.type === 'tradeoff' && question.options && (
          <TradeoffOptions
            options={question.options}
            selected={selected as string | null}
            onSelect={handleSelect}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={!canGoBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className={cn(
            'btn-primary',
            selected === null && 'opacity-40 cursor-not-allowed'
          )}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function LikertScale({
  selected,
  onSelect,
}: {
  selected: number | null
  onSelect: (v: number) => void
}) {
  return (
    <div>
      {/* Mobile: Vertical list */}
      <div className="md:hidden space-y-2">
        {LIKERT_LABELS.map((item) => (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            data-selected={selected === item.value}
            className={cn(
              'w-full py-3 px-4 text-left text-sm font-medium rounded-xl border-2 border-slate-200 transition-all duration-150 cursor-pointer',
              LIKERT_COLORS[item.value - 1],
              selected === item.value && 'shadow-sm'
            )}
          >
            <span className="flex items-center gap-3">
              <span className={cn(
                'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
                selected === item.value
                  ? 'border-current bg-current'
                  : 'border-slate-300'
              )}>
                {selected === item.value && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
              {item.shortLabel}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: Horizontal scale */}
      <div className="hidden md:block">
        <div className="flex gap-1.5">
          {LIKERT_LABELS.map((item) => (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              data-selected={selected === item.value}
              className={cn(
                'flex-1 py-4 px-1 text-center text-xs font-medium rounded-xl border-2 border-slate-200 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-axiom-500',
                LIKERT_COLORS[item.value - 1],
                selected === item.value && 'shadow-sm scale-105'
              )}
            >
              <span className="block whitespace-pre-line leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs text-green-600 font-medium">Strongly Agree →</span>
          <span className="text-xs text-red-600 font-medium">← Strongly Disagree</span>
        </div>
      </div>
    </div>
  )
}

function YesNoOptions({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { value: 'yes', label: 'Yes', description: 'I support this', color: 'green' },
        { value: 'no', label: 'No', description: 'I oppose this', color: 'red' },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            'py-6 px-4 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-axiom-500',
            selected === option.value
              ? option.color === 'green'
                ? 'border-green-500 bg-green-50 shadow-sm'
                : 'border-red-500 bg-red-50 shadow-sm'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          )}
        >
          <span className={cn(
            'block text-2xl font-bold mb-1 font-display',
            selected === option.value && option.color === 'green' && 'text-green-700',
            selected === option.value && option.color === 'red' && 'text-red-700',
            selected !== option.value && 'text-slate-700'
          )}>
            {option.label}
          </span>
          <span className="text-xs text-slate-500">{option.description}</span>
        </button>
      ))}
    </div>
  )
}

function TradeoffOptions({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; effect: { economic: number; social: number } }[]
  selected: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400 uppercase tracking-wider font-mono mb-4">
        Choose the statement that best reflects your view:
      </p>
      {options.map((option, idx) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            'w-full p-5 text-left rounded-2xl border-2 cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-axiom-500',
            selected === option.id
              ? 'border-axiom-500 bg-axiom-50 shadow-sm'
              : 'border-slate-200 hover:border-axiom-200 hover:bg-slate-50'
          )}
        >
          <div className="flex items-start gap-3">
            <span className={cn(
              'w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all text-xs font-bold',
              selected === option.id
                ? 'border-axiom-500 bg-axiom-500 text-white'
                : 'border-slate-300 text-slate-400'
            )}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className={cn(
              'text-sm leading-relaxed',
              selected === option.id ? 'text-axiom-900 font-medium' : 'text-slate-700'
            )}>
              {option.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
