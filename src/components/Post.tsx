import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Markdown } from '@/components/code'
import { useTranslation } from '@/lib/i18n'
import { Post } from '@/lib/posts'

import ShareButtons from './ShareButtons'

export const PostView: React.FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation('es')
  return (
    <div className='content'>
      <h1 className=''>{post.title}</h1>
      <div className='flex  justify-between'>
        <div>
          {post.date} | <FontAwesomeIcon icon={faBookOpenReader} /> {post.readTime} min
        </div>
        <ShareButtons url='https://pepe.go' />
      </div>
      <Markdown post={post} />
    </div>
  )
}
