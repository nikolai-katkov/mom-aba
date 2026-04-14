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
import { DictionaryPage } from './pages/DictionaryPage'
import { LevelAssessmentPage } from './pages/LevelAssessmentPage'
import { LevelsListPage } from './pages/LevelsListPage'
import { MasteryGridPage } from './pages/MasteryGridPage'
import { NotFound } from './pages/NotFound'
import { OnboardingPage } from './pages/OnboardingPage'
import { PracticeCardPage } from './pages/PracticeCardPage'
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
            <Route path="/dictionary/:categoryId?" element={<DictionaryPage />} />
            <Route path="/:sectionId" element={<SectionIntroPage />} />
            <Route path="/:sectionId/levels" element={<LevelsListPage />} />
            <Route path="/:sectionId/levels/:levelId" element={<LevelAssessmentPage />} />
            <Route path="/:sectionId/levels/:levelId/mastery" element={<MasteryGridPage />} />
            <Route path="/:sectionId/levels/:levelId/practice" element={<PracticeCardPage />} />
            <Route path="/:sectionId/levels/:levelId/train" element={<TrainingPage />} />
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
