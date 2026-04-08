import type { AssessmentState } from '../types'

const STORAGE_KEY = 'neuron-assessment-state'

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
