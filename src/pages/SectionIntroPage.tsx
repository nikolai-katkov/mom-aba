import { useCallback, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout, ProgressiveDisclosure, Tabs } from '../components/ui'
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

  const sectionSiblings = useMemo(
    () =>
      sections
        .filter(s => s.isAvailable)
        .map(s => ({ label: s.title, path: `/${s.id}`, isCurrent: s.id === sectionId })),
    [sections, sectionId]
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}`, siblings: sectionSiblings },
          ]
        : [],
    [t, section, sectionSiblings]
  )

  const handleStart = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  const handleSkip = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  const videos = introduction?.videos
  const [activeVideoIndex, setActiveVideoIndex] = useState('0')

  const videoTabOptions = useMemo(
    () => (videos ?? []).map((v, i) => ({ value: String(i), label: v.label })),
    [videos]
  )

  if (!section || !introduction) {
    return <Navigate to="/" replace />
  }

  const activeVideoSrc = videos ? videos[Number(activeVideoIndex)]?.src : introduction.videoSrc

  return (
    <PageLayout title={section.title} breadcrumbs={breadcrumbs}>
      <p className={styles.sectionSubtitle}>{section.subtitle}</p>

      {videos && videos.length > 1 ? (
        <div className={styles.videoSection}>
          <Tabs options={videoTabOptions} value={activeVideoIndex} onChange={setActiveVideoIndex} />
          <div className={styles.videoWrapper}>
            <video
              key={activeVideoSrc}
              className={styles.video}
              src={activeVideoSrc}
              controls
              preload="metadata"
              playsInline
            />
          </div>
        </div>
      ) : activeVideoSrc ? (
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            src={activeVideoSrc}
            controls
            preload="metadata"
            playsInline
          />
        </div>
      ) : null}

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
