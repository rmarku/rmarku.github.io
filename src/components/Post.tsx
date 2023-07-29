import { MDXContentProps } from 'mdx-bundler/client'
import Image from 'next/image'
import { FunctionComponent } from 'react'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'
import { Post } from '@/lib/posts'

import Comments from './Comments'
import { Markdown } from './code'

export const PostView: React.FC<{ post: Post; comp: FunctionComponent<MDXContentProps>; lng: SupportedLanguages }> = ({
  post,
  comp,
  lng,
}) => {
  const { t } = useTranslation('es')
  const img = `/images/posts/${post.thumbnail}`
  return (
    <article className='blogPost'>
      <h1 className=''>{post.title}</h1>
      <Image src={img} alt='thumbnail' className='rounded-xl h-56 object-cover w-full' width={0} height={0} />
      <hr />
      <Markdown post={post} Comp={comp} />
      <hr />
      <Comments />
    </article>
  )
}
