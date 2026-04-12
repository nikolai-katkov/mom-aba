import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import type { BreadcrumbSibling } from './Breadcrumbs'
import styles from './Breadcrumbs.module.css'

const HOVER_ENTER_DELAY = 150
const HOVER_LEAVE_DELAY = 300

interface BreadcrumbDropdownProps {
  label: string
  path: string
  siblings: BreadcrumbSibling[]
  isCurrentPage: boolean
}

export function BreadcrumbDropdown({
  label,
  path,
  siblings,
  isCurrentPage,
}: BreadcrumbDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const spanTriggerRef = useRef<HTMLSpanElement>(null)

  const clearTimers = useCallback(() => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current)
      enterTimer.current = null
    }
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const handleMouseEnter = useCallback(() => {
    clearTimers()
    enterTimer.current = setTimeout(() => {
      setIsOpen(true)
    }, HOVER_ENTER_DELAY)
  }, [clearTimers])

  const handleMouseLeave = useCallback(() => {
    clearTimers()
    leaveTimer.current = setTimeout(() => {
      setIsOpen(false)
    }, HOVER_LEAVE_DELAY)
  }, [clearTimers])

  const close = useCallback(() => {
    setIsOpen(false)
    ;(triggerRef.current ?? spanTriggerRef.current)?.focus()
  }, [])

  const getMenuItems = useCallback((): HTMLAnchorElement[] => {
    if (!menuRef.current) {
      return []
    }
    return Array.from(menuRef.current.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'))
  }, [])

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
        case ' ': {
          if (isCurrentPage) {
            event.preventDefault()
            setIsOpen(prev => !prev)
          }
          break
        }
        case 'ArrowDown': {
          event.preventDefault()
          setIsOpen(true)
          requestAnimationFrame(() => {
            const items = getMenuItems()
            items[0]?.focus()
          })
          break
        }
        case 'Escape': {
          if (isOpen) {
            event.preventDefault()
            close()
          }
          break
        }
      }
    },
    [isCurrentPage, isOpen, close, getMenuItems]
  )

  const focusMenuItem = useCallback(
    (
      items: HTMLAnchorElement[],
      currentIndex: number,
      direction: 'next' | 'prev' | 'first' | 'last'
    ) => {
      const targets: Record<string, number> = {
        next: currentIndex < items.length - 1 ? currentIndex + 1 : 0,
        prev: currentIndex > 0 ? currentIndex - 1 : items.length - 1,
        first: 0,
        last: items.length - 1,
      }
      items[targets[direction]]?.focus()
    },
    []
  )

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const items = getMenuItems()
      const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement)

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'Home':
        case 'End': {
          event.preventDefault()
          const directionMap: Record<string, 'next' | 'prev' | 'first' | 'last'> = {
            ArrowDown: 'next',
            ArrowUp: 'prev',
            Home: 'first',
            End: 'last',
          }
          focusMenuItem(items, currentIndex, directionMap[event.key])
          break
        }
        case 'Escape': {
          event.preventDefault()
          close()
          break
        }
        case 'Tab': {
          setIsOpen(false)
          break
        }
      }
    },
    [close, getMenuItems, focusMenuItem]
  )

  const handleItemClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  const chevronIcon = (
    <ChevronDown
      size={12}
      aria-hidden="true"
      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
    />
  )

  return (
    <div
      ref={wrapperRef}
      className={styles.dropdownWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isCurrentPage ? (
        <span
          ref={spanTriggerRef}
          className={styles.dropdownTriggerCurrent}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-current="location"
          onKeyDown={handleTriggerKeyDown}
        >
          {label}
          {chevronIcon}
        </span>
      ) : (
        <Link
          to={path}
          ref={triggerRef}
          className={styles.dropdownTrigger}
          aria-haspopup="true"
          aria-expanded={isOpen}
          onKeyDown={handleTriggerKeyDown}
        >
          {label}
          {chevronIcon}
        </Link>
      )}

      {isOpen ? (
        <ul ref={menuRef} role="menu" className={styles.dropdownMenu} onKeyDown={handleMenuKeyDown}>
          {siblings.map(sibling => (
            <li key={sibling.path} role="none">
              <Link
                to={sibling.path}
                role="menuitem"
                tabIndex={-1}
                className={`${styles.dropdownLink} ${sibling.isCurrent ? styles.dropdownLinkCurrent : ''}`}
                aria-current={sibling.isCurrent ? 'location' : undefined}
                onClick={handleItemClick}
              >
                {sibling.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
