import remarkToc from '@stefanprobst/remark-extract-toc'
import remarkTocExport from '@stefanprobst/remark-extract-toc/mdx'
import { readFileSync } from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { DateTimeFormatOptions } from 'next-intl'
import path from 'path'
import { readingTime } from 'reading-time-estimator'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import YAML from 'yaml'

import { SupportedLanguages } from '@/lib/i18n'

import { ContentDirectory, PostDirectory, getDirNames, getPostContent } from './fileUtils'

export function getDate(date: string | number, locale: string | undefined): string {
  const options: DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  return new Date(date).toLocaleDateString(locale || 'es', options)
}

export type FrontMatter = {
  title: string
  date: string
  updated: string
  category: string
  description: string
  thumbnail: string
  type: 'page' | 'blog'
  keywords: string[]
  tags: string[]
}

export type Post = {
  slug: string
  lang: SupportedLanguages
  post_lang: SupportedLanguages
  content: string
  readTime: number
} & FrontMatter

export const getSortedPosts = async (
  locale: SupportedLanguages | undefined,
  defaultLocale: SupportedLanguages,
): Promise<Post[]> => {
  //Reads all the files in the post directory
  const dirNames = getDirNames()

  let allPostsData: Post[] = []

  for (const dirname of dirNames) {
    allPostsData.push(await getPostdata(dirname, locale, defaultLocale))
  }
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}


//Get Post based on Slug
export const getPostdata = async (
  slug: string,
  locale: SupportedLanguages | undefined,
  defaultLocale: SupportedLanguages,
): Promise<Post> => {
  const { fileContents, post_lang } = getPostContent(slug, locale, defaultLocale)
  const filesPath = path.join(PostDirectory, slug)

  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    cwd: filesPath,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkToc, remarkTocExport]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMdxCodeProps,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ]

      return options
    },
  })

  const data = frontmatter as FrontMatter

  const formattedDate = getDate(data.date, locale)
  const content = code
  const lang: SupportedLanguages = locale || defaultLocale

  verifyFrontmatter(data, slug + '/' + lang + '.mdx')
  const post = {
    ...data,
    date: formattedDate,
    lang,
    slug,
    post_lang,
    content,
    readTime: readingTime(fileContents, 175, lang).minutes,
  }
  return post
}

export const getYamlData = async (file: string, lang: string) => {
  const cv_files = path.join(ContentDirectory, 'cv')
  const fullPath = path.join(cv_files, `${file}.${lang}.yaml`)
  const data = readFileSync(fullPath, 'utf8')

  return YAML.parse(data)
}

function verifyFrontmatter(data: FrontMatter, file: string): boolean {
  let err = false
  const missing: string[] = []
  type FrontMatterKeys = keyof typeof data

  const fields = [
    'title',
    'date',
    'updated',
    'category',
    'description',
    'thumbnail',
    'type',
    'keywords',
    'tags',
  ] as FrontMatterKeys[]

  for (const f of fields) {
    if (!data.hasOwnProperty(f) || data[f].length == 0) {
      missing.push(f)
      err = true
    }
  }

  if (err) console.log(`⚠️  file "${file}" is missing ${missing.join(', ')}`)

  return err
}
