export interface TrainingStep {
  stepNumber: number
  instruction: string
}

export interface TrainingContent {
  criterionId: string
  shortGuide: TrainingStep[]
  fullGuide: string
  commonMistakes: string[]
}
