import type { ReactNode } from 'react'
import { useCallback } from 'react'

import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  onClick?: () => void
  isDisabled?: boolean
  isClickable?: boolean
}

export function Card({ children, onClick, isDisabled = false, isClickable }: CardProps) {
  const clickable = isClickable ?? (!!onClick && !isDisabled)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick?.()
      }
    },
    [onClick]
  )

  const className = [
    styles.card,
    clickable ? styles.clickable : '',
    isDisabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  )
}
