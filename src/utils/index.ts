export {
  createInitialDictionaryState,
  createInitialState,
  loadAssessmentState,
  loadColorMode,
  loadDictionaryState,
  loadLanguage,
  loadTheme,
  saveAssessmentState,
  saveColorMode,
  saveDictionaryState,
  saveLanguage,
  saveTheme,
} from './storage'

export const ROMAN: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }
