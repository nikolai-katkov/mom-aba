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
