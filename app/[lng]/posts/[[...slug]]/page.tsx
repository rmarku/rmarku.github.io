import { getAllPostSlugs, getPostdata } from '@/lib/posts'
import { languages, fallbackLng, SupportedLanguages } from '@/i18n/settings'
import { PostView } from './Post'

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
