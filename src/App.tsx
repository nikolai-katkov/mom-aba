import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { ControlsPill } from './components/ui'
import { AssessmentProvider, ThemeProvider, useLanguage } from './hooks'
import { LanguageProvider } from './i18n'
import { CriteriaListPage } from './pages/CriteriaListPage'
import { CriterionAssessmentPage } from './pages/CriterionAssessmentPage'
import { NotFound } from './pages/NotFound'
import { SectionIntroPage } from './pages/SectionIntroPage'
import { SectionsListPage } from './pages/SectionsListPage'
import { TrainingPage } from './pages/TrainingPage'

function AppRoutes() {
  const { sections } = useLanguage()

  return (
    <AssessmentProvider sections={sections}>
      <Routes>
        <Route path="/" element={<SectionsListPage />} />
        <Route path="/:sectionId" element={<SectionIntroPage />} />
        <Route path="/:sectionId/levels" element={<CriteriaListPage />} />
        <Route path="/:sectionId/levels/:criterionId" element={<CriterionAssessmentPage />} />
        <Route path="/:sectionId/levels/:criterionId/train" element={<TrainingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AssessmentProvider>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <LanguageProvider>
          <AppRoutes />
          <ControlsPill />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
