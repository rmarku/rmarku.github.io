'use client'
import { useCallback, useState } from 'react'

function DarkToggle() {
  const [theme, setMode] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const toggleColorMode = useCallback(() => {
    const d = document.body
    d.classList.remove('dark')
    if (!theme) d.classList.add('dark')
    setMode((prevMode) => !prevMode)
  }, [theme])
  return (
    <button className="ml-2 text-white focus:outline-none" onClick={toggleColorMode} aria-label="Toggle dark mode">
      {theme ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 15.5V8a4 4 0 00-4-4m0 0H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2 4 4 0 01-4-4z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 10-8 0 4 4 0 008 0z"
          />
        </svg>
      )}
    </button>
  )
}

export default DarkToggle
