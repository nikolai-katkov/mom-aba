import type { ReactNode } from 'react'

import type { BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import styles from './PageLayout.module.css'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  wide?: boolean
  extraWide?: boolean
}

export function PageLayout({ children, title, breadcrumbs, wide, extraWide }: PageLayoutProps) {
  return (
    <main
      className={[styles.layout, wide && styles.wide, extraWide && styles.extraWide]
        .filter(Boolean)
        .join(' ')}
    >
      <header className={styles.header}>
        {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
        {title ? <h1 className={styles.title}>{title}</h1> : null}
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  )
}
