import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { SECTIONS } from '../data'
import type { AssessmentState, CriterionState, CriterionStatus } from '../types'
import { loadAssessmentState, saveAssessmentState } from '../utils'

interface AssessmentContextValue {
  getCriterionState: (criterionId: string) => CriterionState
  setCriterionResult: (criterionId: string, score: number) => void
  getSectionProgress: (sectionId: string) => {
    completed: number
    total: number
    status: CriterionStatus
  }
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)
AssessmentContext.displayName = 'AssessmentContext'

const DEFAULT_CRITERION_STATE: CriterionState = {
  status: 'NotStarted',
  score: 0,
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(loadAssessmentState)

  useEffect(() => {
    saveAssessmentState(state)
  }, [state])

  const getCriterionState = useCallback(
    (criterionId: string): CriterionState =>
      state.criterionStates[criterionId] ?? DEFAULT_CRITERION_STATE,
    [state.criterionStates]
  )

  const setCriterionResult = useCallback((criterionId: string, score: number) => {
    setState(previous => ({
      ...previous,
      criterionStates: {
        ...previous.criterionStates,
        [criterionId]: {
          score,
          status: score > 0 ? 'Completed' : 'InProgress',
        },
      },
    }))
  }, [])

  const getSectionProgress = useCallback(
    (sectionId: string): { completed: number; total: number; status: CriterionStatus } => {
      const section = SECTIONS.find(s => s.id === sectionId)
      if (!section) {
        return { completed: 0, total: 0, status: 'NotStarted' }
      }

      const total = section.criteria.length
      let completedCount = 0
      let hasInProgress = false

      for (const criterion of section.criteria) {
        const criterionState = state.criterionStates[criterion.id] as CriterionState | undefined
        if (criterionState?.status === 'Completed') {
          completedCount++
        } else if (criterionState?.status === 'InProgress') {
          hasInProgress = true
        }
      }

      let status: CriterionStatus = 'NotStarted'
      if (completedCount === total) {
        status = 'Completed'
      } else if (completedCount > 0 || hasInProgress) {
        status = 'InProgress'
      }

      return { completed: completedCount, total, status }
    },
    [state.criterionStates]
  )

  const value = useMemo(
    () => ({ getCriterionState, setCriterionResult, getSectionProgress }),
    [getCriterionState, setCriterionResult, getSectionProgress]
  )

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}

export function useAssessment(): AssessmentContextValue {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
