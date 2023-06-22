import { Post } from '@/lib/posts'
import { Markdown } from '@/components/code'

export const PostView: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="content">
      <h1 className="">{post.title}</h1>
      <div>{post.date} | {post.readTime} min</div>
      <Markdown post={post} />
    </div>
  )
}
