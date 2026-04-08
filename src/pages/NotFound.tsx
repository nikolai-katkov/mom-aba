import { Link } from 'react-router-dom'

import { useLanguage } from '../hooks'
import { tProps } from '../i18n'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        textAlign: 'center',
      }}
    >
      <h1 {...tProps('notFoundCode')}>{t('notFoundCode')}</h1>
      <p {...tProps('notFoundMessage')}>{t('notFoundMessage')}</p>
      <Link to="/" {...tProps('goHome')}>
        {t('goHome')}
      </Link>
    </main>
  )
}
