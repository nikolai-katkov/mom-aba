import type { LevelStatus } from './assessment'

export interface LevelState {
  status: LevelStatus
  score: number
}

export interface AssessmentState {
  levelStates: Record<string, LevelState>
}
