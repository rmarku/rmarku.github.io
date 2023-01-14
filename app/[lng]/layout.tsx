'use client'
import * as React from 'react'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import LangSelect from '../../components/LangSelect'
import Link from 'next/link'
import { DarkToggle } from '../../components/DarkToggle'
import { usePathname, useRouter } from 'next/navigation'

const pages = [
  { route: '/', text: 'Blog' },
  { route: '/page/about', text: 'Sobre Mi' },
  { route: '/cv', text: 'CV' },
  { route: '/page/uses', text: 'Que uso' },
]

export default function Header({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const pathname = usePathname()
  const route = useRouter()
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const changeLocale = (lang: string) => {
    if (pathname) {
      let uri = pathname.split('/')
      uri[1] = lang
      route.push(uri.join('/'))
    }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Marku Blog
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                fontSize: '0.9em',
                fontStyle: 'italic',
              }}>
              entre transistores y bytes
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
                {pages.map((page) => (
                  <MenuItem component={Link} href={`/${lng}${page.route}`} key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Marku Blog
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  component={Link}
                  href={`/${lng}${page.route}`}
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <LangSelect locale={lng} changeLocale={changeLocale} />
            <DarkToggle />
            <Box></Box>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Created by Ricardo Martín Marcucci, © 2019
          </Typography>
        </Container>
      </Box>
    </>
  )
}
