import { languages } from '../i18n/settings'
import { MuiProvider } from './muiProvider'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng}>
      <head />
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  )
}
