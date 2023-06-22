import { getSortedPosts } from '@/lib/posts'
import { BlogList } from '../../components'
import { SupportedLanguages, languages } from '@/i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Page({ params: { lng } }: { params: { lng: SupportedLanguages } }) {
  const allPosts = await getSortedPosts(lng, 'es')
  const posts = allPosts.filter((p) => !p.hide)
  return (
    <>
      <h2 className="text-center">Recent Posts</h2>
      <BlogList lng={lng} posts={posts} />
    </>
  )
}
