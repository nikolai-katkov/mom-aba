import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type { AssessmentState, LevelState, LevelStatus, Section } from '../types'
import { loadAssessmentState, saveAssessmentState } from '../utils'

interface AssessmentContextValue {
  getLevelState: (levelId: string) => LevelState
  setLevelResult: (levelId: string, score: number) => void
  getSectionProgress: (sectionId: string) => {
    completed: number
    total: number
    status: LevelStatus
  }
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)
AssessmentContext.displayName = 'AssessmentContext'

const DEFAULT_LEVEL_STATE: LevelState = {
  status: 'NotStarted',
  score: 0,
}

interface AssessmentProviderProps {
  children: ReactNode
  sections: Section[]
}

export function AssessmentProvider({ children, sections }: AssessmentProviderProps) {
  const [state, setState] = useState<AssessmentState>(loadAssessmentState)

  useEffect(() => {
    saveAssessmentState(state)
  }, [state])

  const getLevelState = useCallback(
    (levelId: string): LevelState => state.levelStates[levelId] ?? DEFAULT_LEVEL_STATE,
    [state.levelStates]
  )

  const setLevelResult = useCallback((levelId: string, score: number) => {
    setState(previous => ({
      ...previous,
      levelStates: {
        ...previous.levelStates,
        [levelId]: {
          score,
          status: score > 0 ? 'Completed' : 'InProgress',
        },
      },
    }))
  }, [])

  const getSectionProgress = useCallback(
    (sectionId: string): { completed: number; total: number; status: LevelStatus } => {
      const section = sections.find(s => s.id === sectionId)
      if (!section) {
        return { completed: 0, total: 0, status: 'NotStarted' }
      }

      const total = section.levels.length
      let completedCount = 0
      let hasInProgress = false

      for (const level of section.levels) {
        const levelState = state.levelStates[level.id] as LevelState | undefined
        if (levelState?.status === 'Completed') {
          completedCount++
        } else if (levelState?.status === 'InProgress') {
          hasInProgress = true
        }
      }

      let status: LevelStatus = 'NotStarted'
      if (completedCount === total) {
        status = 'Completed'
      } else if (completedCount > 0 || hasInProgress) {
        status = 'InProgress'
      }

      return { completed: completedCount, total, status }
    },
    [state.levelStates, sections]
  )

  const value = useMemo(
    () => ({ getLevelState, setLevelResult, getSectionProgress }),
    [getLevelState, setLevelResult, getSectionProgress]
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
