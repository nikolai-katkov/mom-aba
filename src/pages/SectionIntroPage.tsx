import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout, ProgressiveDisclosure, VideoPlaceholder } from '../components/ui'
import { useLanguage } from '../hooks'
import { tProps } from '../i18n'
import styles from './SectionIntroPage.module.css'

export function SectionIntroPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const navigate = useNavigate()
  const { t, sections, sectionIntroductions } = useLanguage()

  const section = sections.find(s => s.id === sectionId)
  const introduction = sectionId ? sectionIntroductions[sectionId] : undefined

  const criteriaPath = `/${sectionId}/levels`

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}` },
          ]
        : [],
    [t, section]
  )

  const handleStart = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  const handleSkip = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  if (!section || !introduction) {
    return <Navigate to="/" replace />
  }

  return (
    <PageLayout title={section.title} breadcrumbs={breadcrumbs}>
      <p className={styles.sectionSubtitle}>{section.subtitle}</p>

      <VideoPlaceholder label={introduction.videoPlaceholderLabel} />

      <ul className={styles.bulletList}>
        {introduction.shortBullets.map(bullet => (
          <li key={bullet} className={styles.bulletItem}>
            {bullet}
          </li>
        ))}
      </ul>

      <ProgressiveDisclosure>
        <div className={styles.fullExplanation}>
          {introduction.fullExplanation.split('\n\n').map(paragraph => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </ProgressiveDisclosure>

      <div className={styles.actions}>
        <Button onClick={handleStart} {...tProps('start')}>
          {t('start')}
        </Button>
        <Button variant="ghost" onClick={handleSkip} {...tProps('skip')}>
          {t('skip')}
        </Button>
      </div>
    </PageLayout>
  )
}
