import Page from '@/app/[lng]/page'
import { Redirect } from '@/components'

const PageWithLang = () => {
  return (
    <html>
      <Redirect />
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Page params={{ lang: 'es' }} />
      </body>
    </html>
  )
}

export default PageWithLang
