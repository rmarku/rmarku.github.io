import { MDXContentProps } from 'mdx-bundler/client'
import { FunctionComponent, createServerContext } from 'react'

import { Code } from '@/components/code'
import { Post } from '@/lib/posts'

import { components } from './MDXComonents'

export const PostContext = createServerContext<Post | null>('post', null)

type SyntaxProps = { post: Post; Comp: FunctionComponent<MDXContentProps> }
const Markdown: React.FC<SyntaxProps> = ({ post, Comp }) => {
  return (
    <PostContext.Provider value={post}>
      <div className='markdown'>
        <Comp components={{ pre: Code, ...components }} />
      </div>
    </PostContext.Provider>
  )
}
export default Markdown
