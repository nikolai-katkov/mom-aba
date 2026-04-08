import type { CriterionStatus } from './assessment'

export interface CriterionState {
  status: CriterionStatus
  score: number
}

export interface AssessmentState {
  criterionStates: Record<string, CriterionState>
}
