export type Language = 'ru' | 'en'

export interface UiTranslations {
  // Breadcrumbs
  home: string
  breadcrumbLevels: string
  breadcrumbTraining: string
  // PageLayout (legacy — kept for potential reuse)
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
  practiceWords: string
  practiceWordsHint: string
  commonMistakes: string
  retryAssessment: string
  backToList: string
  // NotFound
  notFoundCode: string
  notFoundMessage: string
  goHome: string
  // Language switcher
  switchLanguage: string
  // Dictionary
  dictionaryTitle: string
  dictionarySubtitle: string
  difficultySimple: string
  difficultyMedium: string
  difficultyComplex: string
  zoneIncluded: string
  zoneExcluded: string
  operantMand: string
  operantTact: string
  operantListener: string
  operantEchoic: string
  // Onboarding
  onboardingTitle: string
  onboardingSubtitle: string
  onboardingBeginner: string
  onboardingBeginnerDesc: string
  onboardingIntermediate: string
  onboardingIntermediateDesc: string
  onboardingAdvanced: string
  onboardingAdvancedDesc: string
  // Controls pill
  selectTheme: string
  selectLanguage: string
  themeWarm: string
  themeWarmDesc: string
  themeSoft: string
  themeSoftDesc: string
  themeEditorial: string
  themeEditorialDesc: string
  appControls: string
  toggleDarkMode: string
  lightMode: string
  darkMode: string
  expandControls: string
  collapseControls: string
}
