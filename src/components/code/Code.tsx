import fs from 'fs'
import Link from 'next/link'
import path from 'path'
import { ReactNode, ReactPropTypes, useContext } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

import syncfetch from '@/lib/fetch'
import { PostDirectory } from '@/lib/fileUtils'
import { Post } from '@/lib/posts'

import { PostContext } from './Markdown'
import PlantUML from './PlantUML'
import Syntax from './Syntax'

type CodeChild = { children: ReactNode & { type: string; props: ReactPropTypes } }

const Code = (props: JSX.IntrinsicElements['pre']) => {
  const { children } = props as CodeChild
  const post = useContext(PostContext) as Post
  if (children.type !== 'code') return <pre>{children}</pre>

  const match = /language-(\w+)/.exec(children.props.className || '')
  let content = String(children.props.children).replace(/\n$/, '')

  let component: ReactElement = <></>
  let title: string | ReactElement = ''

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      //@ts-ignore
      const value = props[key]

      switch (key) {
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

  if (match)
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

  return <div className='my-5 xl:mx-36 lg:mx-20 md:mx-5 mx-0 md:text-base text-xs'>{component}</div>
}
export default Code

export function getCode(slug: string) {
  return
}
