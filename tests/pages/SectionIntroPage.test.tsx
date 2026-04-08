import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { SectionIntroPage } from '../../src/pages/SectionIntroPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderPage(sectionId = 'mand') {
  return render(
    <MemoryRouter initialEntries={[`/sections/${sectionId}/intro`]}>
      <AssessmentProvider>
        <Routes>
          <Route path="/sections/:sectionId/intro" element={<SectionIntroPage />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </AssessmentProvider>
    </MemoryRouter>
  )
}

describe('SectionIntroPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders section title and bullets', () => {
    renderPage()
    expect(screen.getByText('MAND')).toBeInTheDocument()
    expect(screen.getByText(/mand is a request/iu)).toBeInTheDocument()
  })

  it('toggles full explanation with Read more', async () => {
    renderPage()
    const toggle = screen.getByRole('button', { name: 'Read more' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('navigates to criteria list when Start is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria')
  })

  it('navigates to criteria list when Skip is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Skip' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria')
  })

  it('redirects to home for invalid sectionId', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
