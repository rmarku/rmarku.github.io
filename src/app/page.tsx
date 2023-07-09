import Page from '@/app/[lng]/page'
import { Redirect } from '@/components'

const PageWithLang = () => {
  return (
    <html>
      <Redirect />
      <body>
        <Page params={{ lng: 'es' }} />
      </body>
    </html>
  )
}

export default PageWithLang
