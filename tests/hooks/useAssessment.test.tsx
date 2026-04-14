import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'

import { AssessmentProvider, useAssessment } from '../../src/hooks'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'

const sections = SECTIONS_BY_LANGUAGE.en

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <AssessmentProvider sections={sections}>{children}</AssessmentProvider>
  }
}

describe('useAssessment', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('throws when used outside AssessmentProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useAssessment())).toThrow(
      'useAssessment must be used within an AssessmentProvider'
    )
    spy.mockRestore()
  })

  it('returns NotStarted for unknown level', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })
    const state = result.current.getLevelState('unknown-id')
    expect(state).toEqual({ status: 'NotStarted', score: 0 })
  })

  it('setLevelResult with score 1 sets status to Completed', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setLevelResult('mand-1', 1)
    })

    const state = result.current.getLevelState('mand-1')
    expect(state).toEqual({ status: 'Completed', score: 1 })
  })

  it('setLevelResult with score 0 sets status to InProgress', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setLevelResult('mand-1', 0)
    })

    const state = result.current.getLevelState('mand-1')
    expect(state).toEqual({ status: 'InProgress', score: 0 })
  })

  it('getSectionProgress correctly counts completed levels', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setLevelResult('mand-1', 1)
      result.current.setLevelResult('mand-3', 1)
    })

    const progress = result.current.getSectionProgress('mand')
    expect(progress).toEqual({
      completed: 2,
      total: 5,
      status: 'InProgress',
    })
  })

  it('getSectionProgress returns NotStarted when no levels assessed', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    const progress = result.current.getSectionProgress('mand')
    expect(progress).toEqual({
      completed: 0,
      total: 5,
      status: 'NotStarted',
    })
  })

  it('getSectionProgress returns Completed when all levels done', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setLevelResult('mand-1', 1)
      result.current.setLevelResult('mand-2', 1)
      result.current.setLevelResult('mand-3', 1)
      result.current.setLevelResult('mand-4', 1)
      result.current.setLevelResult('mand-5', 1)
    })

    const progress = result.current.getSectionProgress('mand')
    expect(progress).toEqual({
      completed: 5,
      total: 5,
      status: 'Completed',
    })
  })

  it('getSectionProgress returns InProgress when any level is InProgress', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setLevelResult('mand-1', 0)
    })

    const progress = result.current.getSectionProgress('mand')
    expect(progress).toEqual({
      completed: 0,
      total: 5,
      status: 'InProgress',
    })
  })

  it('returns zero totals for unknown section', () => {
    const { result } = renderHook(() => useAssessment(), {
      wrapper: createWrapper(),
    })

    const progress = result.current.getSectionProgress('unknown')
    expect(progress).toEqual({
      completed: 0,
      total: 0,
      status: 'NotStarted',
    })
  })
})
