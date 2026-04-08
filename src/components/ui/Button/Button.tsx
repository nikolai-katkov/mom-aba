import type { ReactNode } from 'react'

import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  isDisabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  isDisabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
