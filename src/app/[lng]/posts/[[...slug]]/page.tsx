import { Metadata, ResolvingMetadata } from 'next'

import { PostView } from '@/components/Post'
import { SupportedLanguages, fallbackLng, initI18next, languages } from '@/lib/i18n'
import { getAllPostSlugs, getPostdata } from '@/lib/posts'

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

  return (
    <div>
      <PostView post={post} />
    </div>
  )
}

export async function generateMetadata(
  { params: { slug, lng } }: { params: { slug: string[]; lng: SupportedLanguages } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // const { t } = initI18next(lng, 'common')
  const post = await getPostdata(slug.join('/'), lng, fallbackLng)

  return {
    title: post.title,
    description: post.description,
  }
}
