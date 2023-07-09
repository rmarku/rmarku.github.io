import { getMDXExport } from 'mdx-bundler/client'
import { Metadata, ResolvingMetadata } from 'next'
import { BlogPosting, WithContext } from 'schema-dts'

import { SideBar } from '@/components'
import { PostView } from '@/components/Post'
import { getAllPostSlugs } from '@/lib/fileUtils'
import { SupportedLanguages, fallbackLng, initI18next, languages } from '@/lib/i18n'
import { locales } from '@/lib/i18n/settings'
import { person } from '@/lib/jsonld'
import { Post, getPostdata } from '@/lib/posts'

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
    <>
      <div className='flex justify-between'>
        <div className='w-3/4 px-5'>
          <PostView post={post} comp={Component} lng={lng} />
        </div>
        <div className='w-1/4 border-l-2 px-5'>
          <SideBar post={post} toc={data.tableOfContents} />
        </div>
      </div>
      <JSON_LD lng={lng} post={post} />
    </>
  )
}

export async function generateMetadata(
  { params: { slug, lng } }: { params: { slug: string[]; lng: SupportedLanguages } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { t } = initI18next(lng, 'common')
  const post = await getPostdata(slug.join('/'), lng, fallbackLng)

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
      locale: locales[lng],
      type: 'website',
    },
  }
}

const JSON_LD: React.FC<{ lng: SupportedLanguages; post: Post }> = ({ lng, post }) => {
  const { t } = initI18next(lng, 'common')

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: t('title'),
    url: 'https://www.marku.me/' + post.slug,
    mainEntityOfPage: {
      '@type': 'WebPage',
      url: 'https://www.marku.me',
    },
    description: t('description'),
    author: person(lng),
    keywords: post.keywords,
    wordCount: post.content.trim().split(/\s+/).length,
    articleBody: post.content,
    articleSection: post.category,
    abstract: post.content.split('.')[0],
    text: post.content,
    thumbnailUrl: `https://www.marku.me/images/og/${post.slug}/${lng}.png`,
    image: `https://www.marku.me/images/og/${post.slug}/${lng}.png`,
  }
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
