import { useCallback, useRef, useState } from 'react'

const SWIPE_THRESHOLD = 80
const VELOCITY_THRESHOLD = 0.5
const FLY_OFF_DISTANCE = 600

interface SwipeState {
  offsetX: number
  isDragging: boolean
  flyDirection: 'left' | 'right' | null
}

interface SwipeGestureResult {
  state: SwipeState
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
  }
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}: {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  enabled?: boolean
}): SwipeGestureResult {
  const [state, setState] = useState<SwipeState>({
    offsetX: 0,
    isDragging: false,
    flyDirection: null,
  })

  const startX = useRef(0)
  const startTime = useRef(0)
  const pointerId = useRef<number | null>(null)

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || state.flyDirection) {
        return
      }
      pointerId.current = e.pointerId
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      startX.current = e.clientX
      startTime.current = Date.now()
      setState(prev => ({ ...prev, isDragging: true, offsetX: 0 }))
    },
    [enabled, state.flyDirection]
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) {
      return
    }
    const dx = e.clientX - startX.current
    setState(prev => ({ ...prev, offsetX: dx }))
  }, [])

  const commitSwipe = useCallback(
    (direction: 'left' | 'right') => {
      setState({ offsetX: 0, isDragging: false, flyDirection: direction })
      const handler = direction === 'right' ? onSwipeRight : onSwipeLeft
      // Wait for fly-off animation, then call handler
      setTimeout(() => {
        handler?.()
        setState({ offsetX: 0, isDragging: false, flyDirection: null })
      }, 300)
    },
    [onSwipeLeft, onSwipeRight]
  )

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId.current !== e.pointerId) {
        return
      }
      pointerId.current = null

      const dx = e.clientX - startX.current
      const dt = (Date.now() - startTime.current) / 1000
      const velocity = dt > 0 ? Math.abs(dx) / dt : 0

      if (Math.abs(dx) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
        commitSwipe(dx > 0 ? 'right' : 'left')
      } else {
        setState({ offsetX: 0, isDragging: false, flyDirection: null })
      }
    },
    [commitSwipe]
  )

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) {
      return
    }
    pointerId.current = null
    setState({ offsetX: 0, isDragging: false, flyDirection: null })
  }, [])

  const flyOffX = state.flyDirection === 'right' ? FLY_OFF_DISTANCE : -FLY_OFF_DISTANCE

  return {
    state: {
      ...state,
      offsetX: state.flyDirection ? flyOffX : state.offsetX,
    },
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  }
}
