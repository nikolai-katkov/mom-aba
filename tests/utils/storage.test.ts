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

  it('createInitialState returns empty levelStates', () => {
    const state = createInitialState()
    expect(state.levelStates).toEqual({})
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
      levelStates: {
        'mand-1': { status: 'Completed' as const, score: 1 },
        'mand-2': { status: 'InProgress' as const, score: 0 },
      },
    }
    saveAssessmentState(state)
    const loaded = loadAssessmentState()
    expect(loaded).toEqual(state)
  })

  it('migrates legacy criterionStates to levelStates', () => {
    const legacy = {
      criterionStates: {
        'mand-1': { status: 'Completed', score: 1 },
      },
    }
    localStorage.setItem('mom-aba-assessment-state', JSON.stringify(legacy))
    const loaded = loadAssessmentState()
    expect(loaded.levelStates).toEqual(legacy.criterionStates)
  })
})

describe('dictionary storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('createInitialDictionaryState returns version 2 with empty words', () => {
    const state = createInitialDictionaryState()
    expect(state.version).toBe(2)
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

  it('loadDictionaryState returns initial state for unsupported version', () => {
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
        mastery: {
          mand: { tier: 'notStarted', updatedAt: null },
          tact: { tier: 'mastered', updatedAt: 1000 },
          listenerResponding: { tier: 'notStarted', updatedAt: null },
          echoic: { tier: 'emerging', updatedAt: 2000 },
        },
      },
    }
    saveDictionaryState(state)
    expect(loadDictionaryState()).toEqual(state)
  })

  it('migrates v1 dictionary state to v2', () => {
    const v1State = {
      version: 1,
      onboardingCompleted: true,
      onboardingLevel: 'intermediate',
      words: {
        'toys:simple:0': {
          inclusion: 'included',
          mastery: { mand: 'none', tact: 'selfReport', listenerResponding: 'none', echoic: 'none' },
        },
      },
    }
    localStorage.setItem('mom-aba-dictionary-state', JSON.stringify(v1State))
    const loaded = loadDictionaryState()
    expect(loaded.version).toBe(2)
    expect(loaded.words['toys:simple:0'].mastery.mand.tier).toBe('notStarted')
    expect(loaded.words['toys:simple:0'].mastery.mand.updatedAt).toBeNull()
    expect(loaded.words['toys:simple:0'].mastery.tact.tier).toBe('mastered')
    expect(loaded.words['toys:simple:0'].mastery.tact.updatedAt).toBeGreaterThan(0)
  })
})
