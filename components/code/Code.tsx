import PlantUML from './PlantUML'
import Syntax from './Syntax'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import { PostContext } from './Markdown'
import { useContext } from 'react'
import { Post, PostDirectory } from '@/lib/posts'
import path from 'path'
import fs from 'fs'
import syncfetch from '@/lib/fetch'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import Link from 'next/link'

const Code: React.FC<CodeProps> = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  let content = String(children).replace(/\n$/, '')
  let component: ReactElement
  let title: string | ReactElement = ''

  const post = useContext(PostContext) as Post
  // view if there is some metadata
  if (node.data?.meta) {
    const extra = node.data.meta as string
    const directives = extra.split(';')

    for (const dir of directives) {
      const [type, value] = dir.split('=')
      switch (type) {
        case 'title':
          title = value
          break
        case 'file':
          title = 'File: ' + value.replace('<rootDir>', '')
          const file = value.replace('<rootDir>', post.slug)
          const filepath = path.join(PostDirectory, file)
          const newContent = fs.readFileSync(filepath)
          content = newContent.toString()
          break
        case 'url':
          const url = value
          title = <Link href={url}>{url}</Link>
          content = syncfetch(url)
          break
        default:
          break
      }
    }
  }

  if (!inline && match) {
    switch (match[1]) {
      case 'plantuml':
        component = <PlantUML code={content} />
        break
      default:
        component = (
          <Syntax language={match[1]} title={title}>
            {content}
          </Syntax>
        )
    }
  } else {
    component = (
      <code {...props} className={className}>
        {children}
      </code>
    )
  }
  return <div className="my-5 xl:mx-36 lg:mx-20 md:mx-5 mx-0 md:text-base text-xs">{component}</div>
}
export default Code

export function getCode(slug: string) {
  return
}
