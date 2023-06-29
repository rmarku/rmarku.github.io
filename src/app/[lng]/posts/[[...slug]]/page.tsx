import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import { Metadata, ResolvingMetadata } from 'next'

import { SideBar } from '@/components'
import { PostView } from '@/components/Post'
import { getAllPostSlugs } from '@/lib/fileUtils'
import { SupportedLanguages, fallbackLng, initI18next, languages } from '@/lib/i18n'
import { getPostdata } from '@/lib/posts'

interface page {
  lng: string
  slug: string[]
}

export function generateStaticParams(): page[] {
  const slug = getAllPostSlugs()
  const ret: page[] = []

  for (const l of languages) {
    for (const sl of slug) {
      ret.push({ lng: l, slug: sl })
    }
  }

  return ret
}

export default async function Page({ params: { slug, lng } }: { params: { slug: string[]; lng: SupportedLanguages } }) {
  const post = await getPostdata(slug.join('/'), lng, fallbackLng)
  //const Component = getMDXComponent(post.content)
  const data = getMDXExport(post.content)

  const Component = data.default
  return (
    <div className='flex justify-between'>
      <PostView post={post} comp={Component} />
      <SideBar post={post} toc={data.tableOfContents} />
    </div>
  )
}

export async function generateMetadata(
  { params: { slug, lng } }: { params: { slug: string[]; lng: SupportedLanguages } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { t } = initI18next(lng, 'common')
  const post = await getPostdata(slug.join('/'), lng, fallbackLng)

  let locale = 'es_AR'
  if (lng == 'en') {
    locale = 'es_US'
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: 'https://www.marku.me',
      siteName: t('title'),
      images: [
        {
          url: `https://www.marku.me/images/og/${post.slug}/${lng}.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: 'website',
    },
  }
}
