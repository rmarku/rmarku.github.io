'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'

function DarkToggle() {
  const [theme, setMode] = useState<boolean>(true)
  const setDark = (val: boolean) => {
    if (typeof document != 'undefined') {
      const b = document.body
      b.classList[val ? 'add' : 'remove']('dark')
      setMode(val)
      window.localStorage.setItem('dark', `${val}`)
    }
  }
  useEffect(() => {
    const value = window.localStorage.getItem('dark')
    if (typeof value === 'string') {
      setDark(value === 'true')
    } else {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  const toggleColorMode = useCallback(() => {
    setDark(!theme)
  }, [theme])

  return (
    <button className='ml-2 text-white focus:outline-none' onClick={toggleColorMode} aria-label='Toggle dark mode'>
      <FontAwesomeIcon icon={theme ? faMoon : faSun} width={20} />
    </button>
  )
}

export default DarkToggle
