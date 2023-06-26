import { Metadata, ResolvingMetadata } from 'next'

import { BlogList } from '@/components'
import { SupportedLanguages, initI18next, languages, useTranslation } from '@/lib/i18n'
import { getSortedPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Page({ params: { lng } }: { params: { lng: SupportedLanguages } }) {
  const { t } = useTranslation(lng)
  const allPosts = await getSortedPosts(lng, 'es')
  const posts = allPosts.filter((p) => !p.hide)

  return (
    <>
      <h2 className='text-center'>{t('resentPosts')}</h2>
      <BlogList lng={lng} posts={posts} />
    </>
  )
}

type Props = {
  params: { lng: SupportedLanguages }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { t } = initI18next(params.lng, 'common')

  return {
    title: 'Blog',
    description: t('posts.description'),
  }
}
