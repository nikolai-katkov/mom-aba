import type { Language } from '../i18n'
import type { AssessmentState, ColorMode, DictionaryState, Theme } from '../types'
import { COLOR_MODES, DEFAULT_COLOR_MODE, DEFAULT_THEME, THEMES } from '../types'

const STORAGE_KEY = 'mom-aba-assessment-state'
const DICTIONARY_KEY = 'mom-aba-dictionary-state'
const LANGUAGE_KEY = 'mom-aba-language'
const THEME_KEY = 'mom-aba-theme'
const COLOR_MODE_KEY = 'mom-aba-color-mode'
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

export function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    if (raw && (THEMES as string[]).includes(raw)) {
      return raw as Theme
    }
    return DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
}

export function loadColorMode(): ColorMode {
  try {
    const raw = localStorage.getItem(COLOR_MODE_KEY)
    if (raw && (COLOR_MODES as string[]).includes(raw)) {
      return raw as ColorMode
    }
    return DEFAULT_COLOR_MODE
  } catch {
    return DEFAULT_COLOR_MODE
  }
}

export function saveColorMode(mode: ColorMode): void {
  localStorage.setItem(COLOR_MODE_KEY, mode)
}

// --- Dictionary state ---

function isDictionaryState(value: unknown): value is DictionaryState {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return record.version === 1 && typeof record.words === 'object' && record.words !== null
}

export function createInitialDictionaryState(): DictionaryState {
  return {
    version: 1,
    onboardingCompleted: false,
    onboardingLevel: null,
    words: {},
  }
}

export function loadDictionaryState(): DictionaryState {
  try {
    const raw = localStorage.getItem(DICTIONARY_KEY)
    if (!raw) {
      return createInitialDictionaryState()
    }

    const parsed: unknown = JSON.parse(raw)
    if (isDictionaryState(parsed)) {
      return parsed
    }
    return createInitialDictionaryState()
  } catch {
    return createInitialDictionaryState()
  }
}

export function saveDictionaryState(state: DictionaryState): void {
  localStorage.setItem(DICTIONARY_KEY, JSON.stringify(state))
}
