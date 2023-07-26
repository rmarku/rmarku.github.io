import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import { useContext } from 'react'

import { PostDirectory } from '@/lib/fileUtils'
import { Post } from '@/lib/posts'

import { PostContext } from './Markdown'

function sanitizeTitleForId(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function Paragraph(props: JSX.IntrinsicElements['p']) {
  //@ts-ignore
  if (typeof props.children !== 'string' && typeof props.children.type === 'function') {
    return <>{props.children}</>
  }

  return <p {...props} />
}

function PostImage(props: JSX.IntrinsicElements['img']) {
  const alt = props.alt || ''
  const src = props.src || ''
  const post = useContext(PostContext)

  if (post?.type != 'page')
    return (
      <figure>
        <Image alt={alt} src={src} className='mx-auto rounded-lg object-cover w-auto h-auto' width='0' height='0' />
        <figcaption className='text-center mersocarlin-text-gray'>{alt}</figcaption>
      </figure>
    )
  else
    return (
      <picture>
        <img alt={alt} src={src} style={{ display: 'inline-block' }} />
      </picture>
    )
}

function Anchor(props: JSX.IntrinsicElements['a']) {
  const { href, children } = props
  const post = useContext(PostContext)
  if (!href || post?.type == 'page') return <a {...props} />

  if (href.startsWith('http')) {
    return (
      <Link href={href} target='_blank' rel='noopener noreferrer'>
        {children}
        <sup>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </sup>
      </Link>
    )
  }

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  )
}
export const components: MDXComponents = {
  p: Paragraph,
  a: Anchor,
  img: PostImage,
}