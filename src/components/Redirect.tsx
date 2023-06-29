'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SupportedLanguages, fallbackLng, languages } from '@/lib/i18n/settings'

const Redirect: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    // Redirect to user language
    const userLangs = navigator.languages as SupportedLanguages[]
    for (const l of userLangs) {
      for (const pl of languages) {
        if (l.includes(pl)) {
          router.replace(`/${pl}`)
        }
      }
    }
    router.replace(`/${fallbackLng}`)
  })

  return <></>
}

export default Redirect
