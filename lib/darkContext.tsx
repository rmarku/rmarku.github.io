import { createTheme, Theme } from '@mui/material'
import { createContext, useState, FC, useEffect, useMemo } from 'react'

interface DarkContextI {
  colorMode: { toggleColorMode: () => void }
  theme: Theme | null
}

const DarkContext = createContext<DarkContextI>({
  colorMode: { toggleColorMode: () => {} },
  theme: null,
})

const DarkProvider: React.FC<{ children: any }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    else return 'light'
  })
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return <DarkContext.Provider value={{ colorMode, theme }}>{children}</DarkContext.Provider>
}

export { DarkContext, DarkProvider }
