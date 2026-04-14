import { forwardRef, useCallback, useEffect, useRef } from 'react'

import type { VocabularyCategory } from '../../../types'
import styles from './CategoryRail.module.css'

interface CategoryRailProps {
  categories: VocabularyCategory[]
  activeId: string
  onChange: (id: string) => void
  icons: Record<string, React.ReactNode>
  getProgress?: (categoryId: string) => { included: number; total: number }
}

export function CategoryRail({
  categories,
  activeId,
  onChange,
  icons,
  getProgress,
}: CategoryRailProps) {
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    } catch {
      // scrollIntoView not available in test environments
    }
  }, [activeId])

  return (
    <nav className={styles.rail} aria-label="Categories">
      <div className={styles.list}>
        {categories.map(cat => {
          const isActive = cat.id === activeId
          const progress = getProgress?.(cat.id)
          return (
            <CategoryItem
              key={cat.id}
              id={cat.id}
              name={cat.name}
              icon={icons[cat.id]}
              isActive={isActive}
              included={progress?.included}
              total={progress?.total}
              onChange={onChange}
              ref={isActive ? activeRef : undefined}
            />
          )
        })}
      </div>
    </nav>
  )
}

interface CategoryItemProps {
  id: string
  name: string
  icon?: React.ReactNode
  isActive: boolean
  included?: number
  total?: number
  onChange: (id: string) => void
}

const CategoryItem = forwardRef<HTMLButtonElement, CategoryItemProps>(
  ({ id, name, icon, isActive, included, total, onChange }, ref) => {
    const handleClick = useCallback(() => {
      onChange(id)
    }, [onChange, id])

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
        onClick={handleClick}
        aria-current={isActive ? 'true' : undefined}
        title={name}
      >
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <span className={styles.name}>{name}</span>
        {total !== undefined && included !== undefined ? (
          <span className={styles.count}>
            {included}/{total}
          </span>
        ) : null}
      </button>
    )
  }
)
CategoryItem.displayName = 'CategoryItem'
