import {
  createInitialDictionaryState,
  createInitialState,
  loadAssessmentState,
  loadDictionaryState,
  saveAssessmentState,
  saveDictionaryState,
} from '../../src/utils'

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('createInitialState returns empty criterionStates', () => {
    const state = createInitialState()
    expect(state.criterionStates).toEqual({})
  })

  it('loadAssessmentState returns initial state when localStorage is empty', () => {
    const state = loadAssessmentState()
    expect(state).toEqual(createInitialState())
  })

  it('loadAssessmentState returns initial state for corrupted JSON', () => {
    localStorage.setItem('mom-aba-assessment-state', 'not-valid-json')
    const state = loadAssessmentState()
    expect(state).toEqual(createInitialState())
  })

  it('loadAssessmentState returns initial state for invalid shape', () => {
    localStorage.setItem('mom-aba-assessment-state', JSON.stringify({ wrong: 'shape' }))
    const state = loadAssessmentState()
    expect(state).toEqual(createInitialState())
  })

  it('round-trips state through save and load', () => {
    const state = {
      criterionStates: {
        'mand-1': { status: 'Completed' as const, score: 1 },
        'mand-2': { status: 'InProgress' as const, score: 0 },
      },
    }
    saveAssessmentState(state)
    const loaded = loadAssessmentState()
    expect(loaded).toEqual(state)
  })
})

describe('dictionary storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('createInitialDictionaryState returns version 1 with empty words', () => {
    const state = createInitialDictionaryState()
    expect(state.version).toBe(1)
    expect(state.onboardingCompleted).toBe(false)
    expect(state.onboardingLevel).toBeNull()
    expect(state.words).toEqual({})
  })

  it('loadDictionaryState returns initial state when localStorage is empty', () => {
    expect(loadDictionaryState()).toEqual(createInitialDictionaryState())
  })

  it('loadDictionaryState returns initial state for corrupted JSON', () => {
    localStorage.setItem('mom-aba-dictionary-state', 'not-json')
    expect(loadDictionaryState()).toEqual(createInitialDictionaryState())
  })

  it('loadDictionaryState returns initial state for wrong version', () => {
    localStorage.setItem('mom-aba-dictionary-state', JSON.stringify({ version: 99, words: {} }))
    expect(loadDictionaryState()).toEqual(createInitialDictionaryState())
  })

  it('loadDictionaryState returns initial state for invalid shape', () => {
    localStorage.setItem('mom-aba-dictionary-state', JSON.stringify({ wrong: true }))
    expect(loadDictionaryState()).toEqual(createInitialDictionaryState())
  })

  it('round-trips dictionary state through save and load', () => {
    const state = createInitialDictionaryState()
    state.onboardingCompleted = true
    state.onboardingLevel = 'intermediate'
    state.words = {
      'toys:simple:0': {
        inclusion: 'included',
        mastery: { mand: 'none', tact: 'selfReport', listenerResponding: 'none', echoic: 'none' },
      },
    }
    saveDictionaryState(state)
    expect(loadDictionaryState()).toEqual(state)
  })
})
