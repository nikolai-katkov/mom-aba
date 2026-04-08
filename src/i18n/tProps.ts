/**
 * Returns a `data-t` attribute for translation key identification in development.
 * Stripped in production builds.
 *
 * Usage: <span {...tProps('keyName')}>{t('keyName')}</span>
 * Tests: screen.getByDataT('keyName') via custom query helper
 */
export function tProps(key: string): { 'data-t'?: string } {
  if (import.meta.env.DEV) {
    return { 'data-t': key }
  }
  return {}
}
