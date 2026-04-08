import type { Language } from '../i18n'
import type { AssessmentState } from '../types'

const STORAGE_KEY = 'neuron-assessment-state'
const LANGUAGE_KEY = 'neuron-language'
const DEFAULT_LANGUAGE: Language = 'ru'

export function loadLanguage(): Language {
  try {
    const raw = localStorage.getItem(LANGUAGE_KEY)
    if (raw === 'en' || raw === 'ru') {
      return raw
    }
    return DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function saveLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_KEY, language)
}

export function createInitialState(): AssessmentState {
  return { criterionStates: {} }
}

export function loadAssessmentState(): AssessmentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return createInitialState()
    }

    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'criterionStates' in parsed &&
      typeof (parsed as AssessmentState).criterionStates === 'object'
    ) {
      return parsed as AssessmentState
    }
    return createInitialState()
  } catch {
    return createInitialState()
  }
}

export function saveAssessmentState(state: AssessmentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
