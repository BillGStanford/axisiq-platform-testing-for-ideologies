'use client'

import { useState, useCallback, useRef } from 'react'
import type { Answer, QuizState, SectionId } from '@/types'
import { QUESTIONS, QUIZ_SECTIONS } from '@/data/questions'
import { calculateScore } from '@/lib/scoring'
import { trackQuizStart, trackSectionComplete, trackQuizComplete } from '@/lib/analytics'

export function useQuizState() {
  const startTimeRef = useRef<number>(0)

  const [state, setState] = useState<QuizState>({
    currentSection: 'economy',
    currentQuestionIndex: 0,
    answers: {},
    startedAt: 0,
    completedSections: [],
    isComplete: false,
  })

  const currentSectionQuestions = QUESTIONS.filter(
    (q) => q.section === state.currentSection
  )
  const currentQuestion = currentSectionQuestions[state.currentQuestionIndex]

  const sectionIndex = QUIZ_SECTIONS.findIndex(
    (s) => s.id === state.currentSection
  )

  const totalAnswered = Object.keys(state.answers).length
  const totalQuestions = QUESTIONS.length

  const startQuiz = useCallback(() => {
    const now = Date.now()
    startTimeRef.current = now
    setState((prev) => ({
      ...prev,
      startedAt: now,
      currentSection: 'economy',
      currentQuestionIndex: 0,
      answers: {},
      completedSections: [],
      isComplete: false,
    }))
    trackQuizStart()
  }, [])

  const answerQuestion = useCallback(
    (value: number, rawResponse: string | number | string[]) => {
      if (!currentQuestion) return

      setState((prev) => {
        const newAnswers = {
          ...prev.answers,
          [currentQuestion.id]: {
            questionId: currentQuestion.id,
            value,
            rawResponse,
          },
        }

        const isLastInSection =
          prev.currentQuestionIndex >= currentSectionQuestions.length - 1
        const isLastSection = sectionIndex >= QUIZ_SECTIONS.length - 1

        if (isLastInSection && isLastSection) {
          // Quiz complete
          const result = calculateScore(newAnswers)
          trackQuizComplete(
            result.normalized.economic,
            result.normalized.social,
            result.ideologyId,
            result.confidence,
            Date.now() - startTimeRef.current
          )
          return {
            ...prev,
            answers: newAnswers,
            completedSections: [...prev.completedSections, prev.currentSection],
            isComplete: true,
          }
        }

        if (isLastInSection) {
          // Move to next section
          const nextSection = QUIZ_SECTIONS[sectionIndex + 1]
          trackSectionComplete(prev.currentSection, currentSectionQuestions.length)
          return {
            ...prev,
            answers: newAnswers,
            currentSection: nextSection.id as SectionId,
            currentQuestionIndex: 0,
            completedSections: [...prev.completedSections, prev.currentSection],
          }
        }

        return {
          ...prev,
          answers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }
      })
    },
    [currentQuestion, currentSectionQuestions.length, sectionIndex]
  )

  const goToPreviousQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        }
      }

      if (sectionIndex > 0) {
        const prevSection = QUIZ_SECTIONS[sectionIndex - 1]
        const prevSectionQuestions = QUESTIONS.filter(
          (q) => q.section === prevSection.id
        )
        return {
          ...prev,
          currentSection: prevSection.id as SectionId,
          currentQuestionIndex: prevSectionQuestions.length - 1,
          completedSections: prev.completedSections.filter(
            (s) => s !== prevSection.id
          ),
        }
      }

      return prev
    })
  }, [sectionIndex])

  const skipQuestion = useCallback(() => {
    answerQuestion(0, 'skipped')
  }, [answerQuestion])

  const getResults = useCallback(() => {
    return calculateScore(state.answers)
  }, [state.answers])

  const progressPercentage = Math.round((totalAnswered / totalQuestions) * 100)

  const isFirstQuestion = state.currentQuestionIndex === 0 && sectionIndex === 0

  return {
    state,
    currentQuestion,
    currentSectionQuestions,
    currentSectionData: QUIZ_SECTIONS[sectionIndex],
    sectionIndex,
    totalSections: QUIZ_SECTIONS.length,
    totalAnswered,
    totalQuestions,
    progressPercentage,
    isFirstQuestion,
    startQuiz,
    answerQuestion,
    goToPreviousQuestion,
    skipQuestion,
    getResults,
  }
}
