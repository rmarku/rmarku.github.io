import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { DateTimeFormatOptions } from 'next-intl'
import path from 'path'
import { readingTime } from 'reading-time-estimator'
import YAML from 'yaml'

import { SupportedLanguages } from '@/lib/i18n'

export const ContentDirectory = path.join(process.cwd(), 'content')
export const PostDirectory = path.join(ContentDirectory, 'posts')

export function getDate(date: string | number, locale: string | undefined): string {
  const options: DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  return new Date(date).toLocaleDateString(locale, options)
}

export type FrontMatter = {
  title: string
  date: number | string
  hide: boolean
  description: string
  thumbnail: string
  tags: string[]
}

export type Post = {
  slug: string
  lang: SupportedLanguages
  post_lang: SupportedLanguages
  content: string
  readTime: number
} & FrontMatter

function listFilesInDirectory(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true })
  const files = entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return listFilesInDirectory(entryPath)
    } else {
      return entryPath
    }
  })
  return files
}

function getDirNames(): string[] {
  return listFilesInDirectory(PostDirectory)
    .filter((f) => f.includes('es.mdx'))
    .map((d) => {
      return d.replace(PostDirectory + '/', '').replace('/es.mdx', '')
    })
}

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

//Get Slugs
export const getAllPostSlugs = (): string[][] => {
  const dirNames = getDirNames()
  const slugs: string[][] = dirNames.map((dir) => dir.split('/'))

  return slugs
}

//Get Post based on Slug
export const getPostdata = async (
  slug: string,
  locale: SupportedLanguages | undefined,
  defaultLocale: SupportedLanguages,
): Promise<Post> => {
  const defaultFullPath = path.join(PostDirectory, slug, defaultLocale + '.mdx')
  const fullPath = path.join(PostDirectory, slug, locale + '.mdx')
  let post_lang = locale as SupportedLanguages
  //Extracts contents of the MDX file
  let fileContents
  try {
    fileContents = readFileSync(fullPath, 'utf8')
  } catch (e) {
    fileContents = readFileSync(defaultFullPath, 'utf8')
    post_lang = defaultLocale
  }
  const postMatter = matter(fileContents)
  const data = postMatter.data as FrontMatter

  const formattedDate = getDate(data.date, locale)
  const content = postMatter.content
  const lang: SupportedLanguages = locale || defaultLocale

  verifyFrontmatter(data, slug + '/' + lang + '.mdx')
  const post = {
    ...data,
    date: formattedDate,
    lang,
    slug,
    post_lang,
    content,
    readTime: readingTime(content, 200, lang).minutes,
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
  if (typeof data.date === 'undefined' || !data.date) {
    missing.push('date')
    err = true
  }
  if (typeof data.description === 'undefined' || data.description == '') {
    missing.push('description')
    err = true
  }
  // if (typeof data.hide === 'undefined') {
  //   missing.push('hide')
  //   err = true
  // }
  if (typeof data.thumbnail === 'undefined' || data.thumbnail == '') {
    missing.push('thumbnail')
    err = true
  }
  if (typeof data.title === 'undefined' || data.title == '') {
    missing.push('title')
    err = true
  }
  if (typeof data.tags === 'undefined' || data.tags.length == 0) {
    missing.push('tags')
    err = true
  }

  if (err) console.log(`⚠️  file "${file}" is missing ${missing.join(', ')}`)

  return err
}
