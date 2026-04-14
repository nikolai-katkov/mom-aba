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
  return { levelStates: {} }
}

export function loadAssessmentState(): AssessmentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return createInitialState()
    }

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) {
      return createInitialState()
    }

    // Migrate legacy key: criterionStates -> levelStates
    const record = parsed as Record<string, unknown>
    if ('criterionStates' in record && typeof record.criterionStates === 'object') {
      return { levelStates: record.criterionStates as Record<string, never> }
    }

    if ('levelStates' in record && typeof record.levelStates === 'object') {
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

interface LegacyWordState {
  inclusion: string
  mastery: Record<string, string>
}

function migrateDictionaryV1toV2(state: Record<string, unknown>): DictionaryState {
  const words = (state.words ?? {}) as Record<string, LegacyWordState>
  const migratedWords: Record<string, unknown> = {}

  for (const [wordId, wordState] of Object.entries(words)) {
    const migratedMastery: Record<string, unknown> = {}
    for (const [operant, tier] of Object.entries(wordState.mastery)) {
      if (tier === 'none') {
        migratedMastery[operant] = { tier: 'notStarted', updatedAt: null }
      } else if (tier === 'selfReport') {
        migratedMastery[operant] = { tier: 'mastered', updatedAt: Date.now() }
      } else {
        migratedMastery[operant] = tier // already migrated or new format
      }
    }
    migratedWords[wordId] = { inclusion: wordState.inclusion, mastery: migratedMastery }
  }

  return {
    version: 2,
    onboardingCompleted: state.onboardingCompleted as boolean,
    onboardingLevel: state.onboardingLevel as DictionaryState['onboardingLevel'],
    words: migratedWords as DictionaryState['words'],
  }
}

function isDictionaryState(value: unknown): value is DictionaryState {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    (record.version === 1 || record.version === 2) &&
    typeof record.words === 'object' &&
    record.words !== null
  )
}

export function createInitialDictionaryState(): DictionaryState {
  return {
    version: 2,
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
    if (!isDictionaryState(parsed)) {
      return createInitialDictionaryState()
    }

    // Migrate v1 → v2 (old MasteryTier strings → MasteryRecord objects)
    if (parsed.version === 1) {
      const migrated = migrateDictionaryV1toV2(parsed as unknown as Record<string, unknown>)
      saveDictionaryState(migrated)
      return migrated
    }

    return parsed
  } catch {
    return createInitialDictionaryState()
  }
}

export function saveDictionaryState(state: DictionaryState): void {
  localStorage.setItem(DICTIONARY_KEY, JSON.stringify(state))
}
