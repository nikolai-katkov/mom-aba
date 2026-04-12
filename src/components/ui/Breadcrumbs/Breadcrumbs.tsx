import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BreadcrumbDropdown } from './BreadcrumbDropdown'
import styles from './Breadcrumbs.module.css'

export interface BreadcrumbSibling {
  label: string
  path: string
  isCurrent: boolean
}

export interface BreadcrumbItem {
  label: string
  path: string
  siblings?: BreadcrumbSibling[]
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length < 2) {
    return null
  }

  const parentItem = items[items.length - 2]

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.path} className={styles.item}>
              {index > 0 && (
                <ChevronRight size={14} aria-hidden="true" className={styles.separator} />
              )}
              {item.siblings && item.siblings.length > 1 ? (
                <BreadcrumbDropdown
                  label={item.label}
                  path={item.path}
                  siblings={item.siblings}
                  isCurrentPage={isLast}
                />
              ) : isLast ? (
                <span className={styles.current} aria-current="location">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <Link to={parentItem.path} className={styles.backLink} aria-label={parentItem.label}>
        <ArrowLeft size={16} aria-hidden="true" />
        {parentItem.label}
      </Link>
    </nav>
  )
}
