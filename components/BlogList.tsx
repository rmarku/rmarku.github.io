import { Post } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'

const BlogList: React.FC<{ lng: string; posts: Post[] }> = ({ lng, posts }) => {
  return (
    <section>
      {posts.map((p) => {
        return (
          <article key={p.slug} className="container flex mt-2 border rounded-lg shadow-md p-4 max-w-5xl mx-auto">
            <div className="h-36 w-1/4 min-w-max relative mr-5">
              <Image src={'/images/posts/' + p.thumbnail} alt="thumbnail" fill className="object-cover rounded-lg" />
            </div>

            <div className="w-3/4 ">
              <h3>
                <Link href={lng + '/posts/' + p.slug}>{p.title}</Link>
              </h3>

              <div className="container flex justify-between">
                <small className="italic">{p.date}</small>
                <ul className="flex list-none">
                  {p.tags.map((t) => {
                    return (
                      <li key={t} className="text-gray-700 bg-blue-200 m-0.5 px-2 rounded-full">
                        #{t}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <p className="text-gray-500">{p.description}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
export default BlogList
