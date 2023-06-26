'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface LangSelectProps {
  locale: string
}

const LangSelect: React.FC<LangSelectProps> = ({ locale }) => {
  const pathname = usePathname()
  const route = useRouter()

  const handleChangeLocale = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLang = event.target.value
      if (pathname) {
        const uriParts = pathname.split('/')
        uriParts[1] = newLang
        route.push(uriParts.join('/'))
      }
    },
    [pathname, route],
  )

  return (
    <div className='m-2'>
      <select value={locale} onChange={handleChangeLocale} className=' block rounded-md bg-transparent border-none'>
        <option value='es'>🇪🇸</option>
        <option value='en'>🇬🇧</option>
      </select>
    </div>
  )
}

export default LangSelect
