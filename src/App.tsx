import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { ControlsPill } from './components/ui'
import {
  AssessmentProvider,
  DictionaryProvider,
  ThemeProvider,
  useDictionary,
  useLanguage,
} from './hooks'
import { LanguageProvider } from './i18n'
import { CriteriaListPage } from './pages/CriteriaListPage'
import { CriterionAssessmentPage } from './pages/CriterionAssessmentPage'
import { DictionaryCategoriesPage } from './pages/DictionaryCategoriesPage'
import { DictionaryCategoryDetailPage } from './pages/DictionaryCategoryDetailPage'
import { NotFound } from './pages/NotFound'
import { OnboardingPage } from './pages/OnboardingPage'
import { SectionIntroPage } from './pages/SectionIntroPage'
import { SectionsListPage } from './pages/SectionsListPage'
import { TrainingPage } from './pages/TrainingPage'

function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { isOnboardingCompleted } = useDictionary()

  if (!isOnboardingCompleted) {
    return <OnboardingPage />
  }

  return children
}

function AppRoutes() {
  const { sections, vocabulary } = useLanguage()

  return (
    <DictionaryProvider vocabulary={vocabulary}>
      <OnboardingGate>
        <AssessmentProvider sections={sections}>
          <Routes>
            <Route path="/" element={<SectionsListPage />} />
            <Route path="/dictionary" element={<DictionaryCategoriesPage />} />
            <Route path="/dictionary/:categoryId" element={<DictionaryCategoryDetailPage />} />
            <Route path="/:sectionId" element={<SectionIntroPage />} />
            <Route path="/:sectionId/levels" element={<CriteriaListPage />} />
            <Route path="/:sectionId/levels/:criterionId" element={<CriterionAssessmentPage />} />
            <Route path="/:sectionId/levels/:criterionId/train" element={<TrainingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AssessmentProvider>
      </OnboardingGate>
    </DictionaryProvider>
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
