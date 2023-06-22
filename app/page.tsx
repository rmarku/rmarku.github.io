import Page from '@/app/[lng]/page'
import { Redirect } from '@/components'

const PageWithLang = () => {
  return (
    <>
      <Redirect />
      {/* @ts-expect-error Async Server Component */}
      <Page params={{ lang: 'es' }} />
    </>
  )
}

export default PageWithLang
