'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { fallbackLng, languages } from '../i18n/settings'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    // Redirect to user language
    const userLangs = navigator.languages
    let userLang = userLangs.find((l) => languages.includes(l))
    if (!userLang) userLang = fallbackLng
    router.push(`/${userLang}`)
  })

  return <div></div>
}
