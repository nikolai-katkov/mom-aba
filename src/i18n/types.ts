export type Language = 'ru' | 'en'

export interface UiTranslations {
  // PageLayout
  back: string
  goBack: string
  // StatusBadge
  statusNotStarted: string
  statusInProgress: string
  statusCompleted: string
  // ProgressiveDisclosure
  readMore: string
  showLess: string
  // VideoPlaceholder
  videoComingSoon: string
  // ProgressBar (uses interpolation: {completed}, {total})
  progressLabel: string
  // SectionsListPage
  appTitle: string
  appSubtitle: string
  comingSoon: string
  // SectionIntroPage
  start: string
  skip: string
  // CriteriaListPage (uses interpolation: {completed}, {total})
  completedOfTotal: string
  // CriterionAssessmentPage
  illustration: string
  whatToLookFor: string
  examplesPrefix: string
  yes: string
  no: string
  // TrainingPage
  commonMistakes: string
  retryAssessment: string
  backToList: string
  // NotFound
  notFoundCode: string
  notFoundMessage: string
  goHome: string
  // Language switcher
  switchLanguage: string
}
