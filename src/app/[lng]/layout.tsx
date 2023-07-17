import { dir } from 'i18next'
import Script from 'next/script'

import { Footer, Header } from '@/components/Layout'
import { SupportedLanguages } from '@/lib/i18n'
import '@/styles/globals.scss'

type LayoutProps = {
  children: React.ReactNode
  params: {
    lng: SupportedLanguages
  }
}
const Layout: React.FC<LayoutProps> = async ({ children, params: { lng } }) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel='icon' href='/favicon.ico' />
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script id='theme' strategy='beforeInteractive'>
          {`(()=>{
					// Initial theme resolve before React render.
          const b = document.body

					const is_dark = (()=>{
						const value = window.localStorage.getItem('dark')
						if (typeof value === 'string') {
							return value === 'true'
						}

						return window.matchMedia('(prefers-color-scheme: dark)').matches
					})();

					b.classList[is_dark ? 'add' : 'remove']('dark')
          window.localStorage.setItem('dark', is_dark)
				})();`}
        </Script>
        <Script id='umami' strategy='beforeInteractive'>
          {`(function() {
            var el = document.createElement("script");
            el.setAttribute("src", "https://unami.casa.marku.me/script.js");
            el.setAttribute("data-website-id", "e3c04518-7bec-4d9c-9919-ff5a2cd4adb6");
            el.setAttribute("data-domains", "marku.me");
            document.body.appendChild(el);
          })();`}
        </Script>
      </head>
      <body className='dark'>
        <div className='flex flex-col min-h-screen'>
          <Header lng={lng} />
          <main className='flex-grow container mx-auto py-8 px-4'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
export default Layout
