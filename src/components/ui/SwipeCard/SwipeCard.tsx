import type { ReactNode } from 'react'
import { useMemo } from 'react'

import styles from './SwipeCard.module.css'
import { useSwipeGesture } from './useSwipeGesture'

interface SwipeCardProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  isActive: boolean
  stackIndex?: number
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export function SwipeCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  isActive,
  stackIndex = 0,
}: SwipeCardProps) {
  const { state, handlers } = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
    enabled: isActive,
  })

  const transform = useMemo(() => {
    if (!isActive) {
      const yOffset = stackIndex * 8
      const scaleVal = 1 - stackIndex * 0.04
      return `translateY(${yOffset}px) scale(${scaleVal})`
    }

    const rotation = prefersReducedMotion() ? 0 : state.offsetX * 0.08
    return `translateX(${state.offsetX}px) rotate(${rotation}deg)`
  }, [isActive, stackIndex, state.offsetX])

  const style = useMemo(
    () => ({
      transform,
      transition: state.isDragging ? 'none' : 'transform 0.3s var(--ease-out-back, ease-out)',
      zIndex: isActive ? 10 : 10 - stackIndex,
      willChange: isActive ? ('transform' as const) : ('auto' as const),
      touchAction: isActive ? ('none' as const) : ('auto' as const),
    }),
    [transform, state.isDragging, isActive, stackIndex]
  )

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      style={style}
      {...(isActive ? handlers : {})}
    >
      {children}
    </div>
  )
}
