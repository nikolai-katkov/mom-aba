/**
 * Query element by translation key (data-t attribute).
 * Use instead of hardcoded translation strings in tests.
 *
 * Usage: byT('statusNotStarted') -- returns the element with data-t="statusNotStarted"
 */
export function byT(key: string): HTMLElement {
  const el = document.querySelector(`[data-t="${key}"]`)
  if (!el) {
    throw new Error(`No element found with data-t="${key}"`)
  }
  return el as HTMLElement
}

/**
 * Query all elements by translation key (data-t attribute).
 */
export function allByT(key: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(`[data-t="${key}"]`))
}

/**
 * Query element by translation key, returns null if not found.
 */
export function queryByT(key: string): HTMLElement | null {
  return document.querySelector(`[data-t="${key}"]`)
}
