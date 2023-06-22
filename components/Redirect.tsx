'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SupportedLanguages, fallbackLng, languages } from '@/i18n/settings'

const Redirect: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    // Redirect to user language
    const userLangs = navigator.languages as SupportedLanguages[]
    let userLang = userLangs.find((l) => languages.includes(l))
    if (!userLang) userLang = fallbackLng
    router.replace(`/${userLang}`)
  })

  return <></>
}

export default Redirect
