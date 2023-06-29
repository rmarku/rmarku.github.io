import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXContentProps } from 'mdx-bundler/client'
import { FunctionComponent } from 'react'

import { useTranslation } from '@/lib/i18n'
import { Post } from '@/lib/posts'

import { Markdown } from './code'

export const PostView: React.FC<{ post: Post; comp: FunctionComponent<MDXContentProps> }> = ({ post, comp }) => {
  const { t } = useTranslation('es')

  return (
    <article className='w-3/4 px-5'>
      <h1 className=''>{post.title}</h1>
      <div className='flex  justify-between'>
        <div>
          {post.date} | <FontAwesomeIcon icon={faBookOpenReader} /> {post.readTime} min
        </div>
      </div>
      <Markdown post={post} Comp={comp} />
    </article>
  )
}
