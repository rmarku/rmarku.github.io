'use client'

import Link from 'next/link'
import { useState } from 'react'

import { PageLink } from './Header'

type MobileMenuProps = {
  lng: string
  pages: PageLink[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ pages, lng }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen)
  }

  return (
    <>
      <button className='md:hidden' onClick={toggleNavMenu} aria-label='Open navigation menu'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='h-6 w-6'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>
      {isNavMenuOpen && (
        <nav className='md:hidden p-4'>
          <ul className='space-y-4'>
            {pages.map((page) => (
              <li key={page.text}>
                <Link href={`/${lng}${page.route}/`} className='block text-white' onClick={toggleNavMenu}>
                  {page.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}

export default MobileMenu
