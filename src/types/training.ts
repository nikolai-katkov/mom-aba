export interface TrainingStep {
  stepNumber: number
  instruction: string
}

export interface PracticePrompt {
  brief: string
  detail: string
}

export interface TrainingContent {
  levelId: string
  shortGuide: TrainingStep[]
  fullGuide: string
  commonMistakes: string[]
  practicePrompt: PracticePrompt
}
