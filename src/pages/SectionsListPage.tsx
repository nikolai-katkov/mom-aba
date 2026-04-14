import {
  AudioLines,
  Blocks,
  BookOpen,
  Ear,
  Eye,
  Hand,
  MessageCircle,
  Mic,
  Tag,
  Users,
} from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { useAssessment, useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { Section } from '../types'
import styles from './SectionsListPage.module.css'

const SECTION_ICONS: Record<string, React.ReactNode> = {
  'mand': <MessageCircle size={20} aria-hidden="true" />,
  'tact': <Tag size={20} aria-hidden="true" />,
  'listener-responding': <Ear size={20} aria-hidden="true" />,
  'visual-perceptual': <Eye size={20} aria-hidden="true" />,
  'independent-play': <Blocks size={20} aria-hidden="true" />,
  'social-behaviour': <Users size={20} aria-hidden="true" />,
  'motor-imitation': <Hand size={20} aria-hidden="true" />,
  'echoic': <AudioLines size={20} aria-hidden="true" />,
  'spontaneous-vocal': <Mic size={20} aria-hidden="true" />,
}

function SectionCard({ section }: { section: Section }) {
  const navigate = useNavigate()
  const { getSectionProgress } = useAssessment()
  const { t } = useLanguage()
  const progress = getSectionProgress(section.id)

  const handleClick = useCallback(() => {
    navigate(`/${section.id}`)
  }, [navigate, section.id])

  return (
    <Card isDisabled={!section.isAvailable} onClick={handleClick}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.titleRow}>
            <h2 className={styles.sectionTitle}>
              {SECTION_ICONS[section.id] ? (
                <span className={styles.sectionIcon}>{SECTION_ICONS[section.id]}</span>
              ) : null}
              {section.title}
            </h2>
            {section.isAvailable ? <StatusBadge status={progress.status} /> : null}
          </div>
          <p className={styles.sectionSubtitle}>
            {section.isAvailable ? (
              section.subtitle
            ) : (
              <span {...tProps('comingSoon')}>{t('comingSoon')}</span>
            )}
          </p>
        </div>
        {section.isAvailable ? (
          <div className={styles.progressArea}>
            <ProgressBar completed={progress.completed} total={progress.total} />
            <span className={styles.progressLabel}>
              {progress.completed}/{progress.total}
            </span>
          </div>
        ) : null}
      </div>
    </Card>
  )
}

function DictionaryCard() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleClick = useCallback(() => {
    navigate('/dictionary')
  }, [navigate])

  return (
    <Card onClick={handleClick} isClickable>
      <div className={styles.dictionaryCardContent}>
        <span className={styles.dictionaryIcon}>
          <BookOpen size={22} aria-hidden="true" />
        </span>
        <div className={styles.dictionaryText}>
          <span className={styles.dictionaryTitle} {...tProps('dictionaryTitle')}>
            {t('dictionaryTitle')}
          </span>
          <span className={styles.dictionarySubtitle} {...tProps('dictionarySubtitle')}>
            {t('dictionarySubtitle')}
          </span>
        </div>
      </div>
    </Card>
  )
}

function ResetOnboardingLink() {
  const { resetDictionary } = useDictionary()

  const handleClick = useCallback(() => {
    resetDictionary()
    window.location.reload()
  }, [resetDictionary])

  return (
    <button type="button" className={styles.debugLink} onClick={handleClick}>
      Reset onboarding
    </button>
  )
}

export function SectionsListPage() {
  const { t, sections } = useLanguage()

  return (
    <PageLayout title={t('appTitle')} wide>
      <p className={styles.subtitle} {...tProps('appSubtitle')}>
        {t('appSubtitle')}
      </p>
      <DictionaryCard />
      <div className={styles.sectionList}>
        {sections.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
      <ResetOnboardingLink />
    </PageLayout>
  )
}
