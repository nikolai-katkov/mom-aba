import { Baby, Sparkles, Star } from 'lucide-react'
import { useCallback, useState } from 'react'

import { useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { OnboardingLevel } from '../types'
import styles from './OnboardingPage.module.css'

const LEVELS: Array<{
  level: OnboardingLevel
  icon: typeof Baby
  titleKey: 'onboardingBeginner' | 'onboardingIntermediate' | 'onboardingAdvanced'
  descKey: 'onboardingBeginnerDesc' | 'onboardingIntermediateDesc' | 'onboardingAdvancedDesc'
}> = [
  {
    level: 'beginner',
    icon: Baby,
    titleKey: 'onboardingBeginner',
    descKey: 'onboardingBeginnerDesc',
  },
  {
    level: 'intermediate',
    icon: Sparkles,
    titleKey: 'onboardingIntermediate',
    descKey: 'onboardingIntermediateDesc',
  },
  {
    level: 'advanced',
    icon: Star,
    titleKey: 'onboardingAdvanced',
    descKey: 'onboardingAdvancedDesc',
  },
]

export function OnboardingPage() {
  const { t } = useLanguage()
  const { completeOnboarding } = useDictionary()
  const [selectedLevel, setSelectedLevel] = useState<OnboardingLevel | null>(null)

  const handleSelect = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const level = event.currentTarget.dataset.level as OnboardingLevel
      setSelectedLevel(level)
      setTimeout(() => {
        completeOnboarding(level)
      }, 600)
    },
    [completeOnboarding]
  )

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title} {...tProps('onboardingTitle')}>
            {t('onboardingTitle')}
          </h1>
          <p className={styles.subtitle} {...tProps('onboardingSubtitle')}>
            {t('onboardingSubtitle')}
          </p>
        </header>

        <div className={styles.cards}>
          {LEVELS.map(({ level, icon: Icon, titleKey, descKey }, index) => {
            const isSelected = selectedLevel === level
            const isDimmed = selectedLevel !== null && !isSelected

            return (
              <button
                key={level}
                type="button"
                className={[
                  styles.card,
                  isSelected ? styles.cardSelected : '',
                  isDimmed ? styles.cardDimmed : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                data-level={level}
                onClick={handleSelect}
                disabled={selectedLevel !== null}
                aria-pressed={isSelected}
              >
                <span className={styles.iconWrap}>
                  <Icon size={28} aria-hidden="true" />
                </span>
                <span className={styles.cardText}>
                  <span className={styles.cardTitle} {...tProps(titleKey)}>
                    {t(titleKey)}
                  </span>
                  <span className={styles.cardDesc} {...tProps(descKey)}>
                    {t(descKey)}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
