export {
  createInitialState,
  loadAssessmentState,
  loadColorMode,
  loadLanguage,
  loadTheme,
  saveAssessmentState,
  saveColorMode,
  saveLanguage,
  saveTheme,
} from './storage'

export const ROMAN: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }
