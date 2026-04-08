import { createInitialState, loadAssessmentState, saveAssessmentState } from '../../src/utils'

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
    localStorage.setItem('neuron-assessment-state', 'not-valid-json')
    const state = loadAssessmentState()
    expect(state).toEqual(createInitialState())
  })

  it('loadAssessmentState returns initial state for invalid shape', () => {
    localStorage.setItem('neuron-assessment-state', JSON.stringify({ wrong: 'shape' }))
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
