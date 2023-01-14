import { IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { ColorModeContext } from '../app/muiProvider'

function DarkToggle() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export { DarkToggle }
