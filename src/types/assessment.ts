export type ScoringType = 'TestTrial' | 'CombinedTrial' | 'TimedObservation' | 'FreeOperant'

export type LevelStatus = 'NotStarted' | 'InProgress' | 'Completed'

export type DevelopmentDimension = 'Independence' | 'Generalization' | 'RepertoireSize'

export interface Level {
  id: string
  sectionId: string
  level: number
  title: string
  description: string
  question: string
  scoringType: ScoringType
  conditions: string[]
  examples: string[]
  developmentDimension: DevelopmentDimension
}

export interface Section {
  id: string
  title: string
  subtitle: string
  isAvailable: boolean
  levels: Level[]
}
