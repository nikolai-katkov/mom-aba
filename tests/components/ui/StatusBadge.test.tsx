import { StatusBadge } from '../../../src/components/ui'
import { byT } from '../../helpers/byT'
import { renderWithProviders } from '../../helpers/renderWithProviders'

describe('StatusBadge', () => {
  it('renders NotStarted status with correct key', () => {
    renderWithProviders(<StatusBadge status="NotStarted" />)
    expect(byT('statusNotStarted')).toBeInTheDocument()
  })

  it('renders InProgress status with correct key', () => {
    renderWithProviders(<StatusBadge status="InProgress" />)
    expect(byT('statusInProgress')).toBeInTheDocument()
  })

  it('renders Completed status with correct key', () => {
    renderWithProviders(<StatusBadge status="Completed" />)
    expect(byT('statusCompleted')).toBeInTheDocument()
  })

  it('renders in both languages without error', () => {
    const { unmount } = renderWithProviders(<StatusBadge status="NotStarted" />)
    expect(byT('statusNotStarted')).toBeInTheDocument()
    unmount()

    renderWithProviders(<StatusBadge status="NotStarted" />, { language: 'ru' })
    expect(byT('statusNotStarted')).toBeInTheDocument()
  })
})
