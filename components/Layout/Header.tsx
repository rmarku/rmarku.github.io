import React from 'react'
import { DarkToggle, LangSelect, DesktopNavigation, MobileMenu } from '@/components/Layout'

export type PageLink = {
  route: string
  text: string
}
const pages: PageLink[] = [
  { route: '/', text: 'Blog' },
  { route: '/posts/about', text: 'Sobre Mi' },
  { route: '/cv', text: 'CV' },
  { route: '/posts/uses', text: 'Que uso' },
]

type HeaderProps = {
  lng: string
}
const Header: React.FC<HeaderProps> = ({ lng }) => {
  return (
    <>
      <header className="header text-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <DesktopNavigation pages={pages} lng={lng} />
            <MobileMenu pages={pages} lng={lng} />
          </div>
          <h1 className="bold">Marku Blog </h1>
          <div className="flex items-center">
            <LangSelect locale={lng} />
            <DarkToggle />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
