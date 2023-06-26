import { config } from '@fortawesome/fontawesome-svg-core'
import { Metadata } from 'next'

/* eslint-disable import/first */
import '@/styles/globals.scss'
/* eslint-disable import/first */
config.autoAddCss = false

export const metadata: Metadata = {
  title: {
    template: '%s | Martín Marcucci site',
    default: 'Martín Marcucci site', // a default is required when creating a template
  },
  generator: 'Next.js',
  authors: [{ name: 'Martín Marcucci', url: 'https://www.marku.me' }],
  creator: 'Martín Marcucci',
  metadataBase: new URL('https://www.marku.me'),
  alternates: {
    canonical: '/es',
    languages: {
      'en-US': '/en',
      'es-ES': '/es',
      'es-AR': '/es',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}
export default Layout
