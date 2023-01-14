import { ParsedUrlQuery } from 'querystring'
import { getAllPostSlugs } from '../../../../lib/posts'

export async function generateStaticParams({ params }: { params: { lng: string } }) {
  const { lng } = params
  const slug = getAllPostSlugs()

  return slug.map((s) => ({ lng, slug: s.slug }))
}

export default function Page({ params }: { params: { lng: string; slug: ParsedUrlQuery } }) {
  const { slug, lng } = params

  return (
    <div>
      From Blog {slug.slug} {lng}
    </div>
  )
}
