import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'

import styles from './Tabs.module.css'

export interface TabOption<T extends string = string> {
  value: T
  label: string
}

export interface TabsProps<T extends string = string> {
  options: Array<TabOption<T>>
  value: T
  onChange: (value: T) => void
  className?: string
}

export function Tabs<T extends string>({ options, value, onChange, className }: TabsProps<T>) {
  const barRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const tabValue = event.currentTarget.dataset.value as T
      onChange(tabValue)
    },
    [onChange]
  )

  useEffect(() => {
    const bar = barRef.current
    if (!bar) {
      return
    }
    const activeButton = bar.querySelector<HTMLButtonElement>('[aria-selected="true"]')
    if (activeButton && typeof activeButton.scrollIntoView === 'function') {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
  }, [value])

  const barClass = [styles.tabBar, className].filter(Boolean).join(' ')

  return (
    <div ref={barRef} className={barClass} role="tablist">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          role="tab"
          className={`${styles.tab} ${value === option.value ? styles.tabActive : ''}`}
          data-value={option.value}
          onClick={handleClick}
          aria-selected={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
