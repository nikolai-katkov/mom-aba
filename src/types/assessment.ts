export type ScoringType = 'TCT' | 'NAB' | 'KOM' | 'NOV'

export type CriterionStatus = 'NotStarted' | 'InProgress' | 'Completed'

export type DevelopmentDimension = 'Independence' | 'Generalization' | 'RepertoireSize'

export interface Criterion {
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
  criteria: Criterion[]
}
