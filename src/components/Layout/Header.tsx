import React from 'react'

import { DarkToggle, DesktopNavigation, LangSelect, MobileMenu } from '@/components/Layout'
import { SupportedLanguages, fallbackLng, languages, useTranslation } from '@/lib/i18n'
import { getSortedPosts } from '@/lib/posts'

import SearchBar from './SearchBar'

export type PageLink = {
  route: string
  text: string
}

type HeaderProps = {
  lng: SupportedLanguages
}
const Header: React.FC<HeaderProps> = async ({ lng }) => {
  const { t } = useTranslation(lng, 'common')
  const posts = []
  for (const l of languages) {
    posts.push(...(await getSortedPosts(l, fallbackLng)))
  }

  const uniqueIds: string[] = []
  const unique_posts = posts.filter((p) => {
    const post_id = p.post_lang + '/' + p.slug
    const isDuplicate = uniqueIds.includes(post_id)
    if (!isDuplicate) {
      uniqueIds.push(post_id)

      return true
    }
    return false
  })

  const pages: PageLink[] = [
    { route: '/', text: t('blog') },
    { route: '/posts/about', text: t('about') },
    { route: '/resume', text: t('CV') },
    { route: '/posts/uses', text: t('uses') },
  ]

  return (
    <header className='header text-white'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <div className='flex items-center'>
          <DesktopNavigation pages={pages} lng={lng} />
          <MobileMenu pages={pages} lng={lng} />
        </div>
        <span className='bold text-4xl my-0 py-0'>Marku Blog </span>
        <div className='flex items-center'>
          <SearchBar posts={unique_posts} serarchText={t('search')} />
          <LangSelect locale={lng} />
          <DarkToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
