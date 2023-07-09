import { Metadata, ResolvingMetadata } from 'next'
import { WebPage, WithContext } from 'schema-dts'

import { BlogList } from '@/components'
import { SupportedLanguages, initI18next, languages, useTranslation } from '@/lib/i18n'
import { locales } from '@/lib/i18n/settings'
import { person } from '@/lib/jsonld'
import { getSortedPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Page({ params: { lng } }: { params: { lng: SupportedLanguages } }) {
  const { t } = useTranslation(lng)
  const allPosts = await getSortedPosts(lng, 'es')
  const posts = allPosts.filter((p) => p.type == 'blog')

  return (
    <>
      <h1 className='text-center'>{t('resentPosts')}</h1>
      <BlogList lng={lng} posts={posts} />
      <JSON_LD lng={lng} />
    </>
  )
}

type Props = {
  params: { lng: SupportedLanguages }
}

export async function generateMetadata({ params: { lng } }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { t } = initI18next(lng, 'common')

  return {
    title: 'Blog',
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://www.marku.me',
      siteName: t('title'),
      images: [
        {
          url: `https://www.marku.me/images/og/page.${lng}.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: locales[lng],
      type: 'website',
    },
  }
}

const JSON_LD: React.FC<{ lng: SupportedLanguages }> = ({ lng }) => {
  const { t } = useTranslation(lng)

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    url: 'https://www.marku.me',
    mainEntityOfPage: {
      '@type': 'WebPage',
      url: 'https://www.marku.me',
    },
    description: t('description'),
    publisher: person(lng),
  }
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
