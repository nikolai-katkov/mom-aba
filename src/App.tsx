import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { AssessmentProvider, useLanguage } from './hooks'
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
        <Route path="/sections/:sectionId/intro" element={<SectionIntroPage />} />
        <Route path="/sections/:sectionId/criteria" element={<CriteriaListPage />} />
        <Route
          path="/sections/:sectionId/criteria/:criterionId/assess"
          element={<CriterionAssessmentPage />}
        />
        <Route path="/sections/:sectionId/criteria/:criterionId/train" element={<TrainingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AssessmentProvider>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  )
}
