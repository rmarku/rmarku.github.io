import { bundleMDX } from 'mdx-bundler'
import { createServerContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Code } from '@/components/code'
import { Post } from '@/lib/posts'

export const PostContext = createServerContext<Post | null>('post', null)

type SyntaxProps = { post: Post }
const Markdown: React.FC<SyntaxProps> = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <div className='markdown'>
        <ReactMarkdown
          components={{
            code: Code,
          }}
          remarkPlugins={[remarkGfm]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}>
          {post.content}
        </ReactMarkdown>
      </div>
    </PostContext.Provider>
  )
}
export default Markdown
