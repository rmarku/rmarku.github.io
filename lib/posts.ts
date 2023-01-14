import { readFileSync, existsSync } from 'node:fs'
import path from 'path'
//import { bundleMDX } from 'mdx-bundler'
import { DateTimeFormatOptions } from 'next-intl'
import { ParsedUrlQuery } from 'querystring'
import klawSync from 'klaw-sync'
import YAML from 'yaml'

const contentDirectory = path.join(process.cwd(), 'content')
const postDirectory = path.join(contentDirectory, 'posts')

export function getDate(date: string | number, locale: string | undefined): string {
  const options: DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  return new Date(date).toLocaleDateString(locale, options)
}

export type Post = {
  slug: string
  date: string
  title?: string
  description?: string
}

function getDirNames(): string[] {
  return klawSync(postDirectory, { nodir: true })
    .filter((f) => f.path.includes('es.mdx'))
    .map((d) => {
      return d.path.replace(postDirectory + '/', '').replace('/es.mdx', '')
    })
}

export const getSortedPosts = async (
  locale: string | undefined,
  defaultLocale: string | undefined,
): Promise<Post[]> => {
  //Reads all the files in the post directory
  const dirNames = getDirNames()

  let allPostsData: Post[] = []

  for (const dirname of dirNames) {
    const slug = dirname

    const defaultFullPath = path.join(postDirectory, dirname, defaultLocale + '.mdx')
    const fullPath = path.join(postDirectory, dirname, locale + '.mdx')
    //Extracts contents of the MDX file
    let fileContents
    try {
      fileContents = readFileSync(fullPath, 'utf8')
    } catch (e) {
      fileContents = readFileSync(defaultFullPath, 'utf8')
    }
    const data = { frontmatter: { date: 1324, hide: true } } // await bundleMDX({ source: fileContents })

    const formattedDate = getDate(data.frontmatter.date, locale)

    const frontmatter = {
      ...data.frontmatter,
      date: formattedDate,
    }

    if (data.frontmatter.hide == null)
      allPostsData.push({
        slug,
        ...frontmatter,
      })
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
export const getAllPostSlugs = (): Array<ParsedUrlQuery> => {
  const dirNames = getDirNames()
  const slugs: Array<ParsedUrlQuery> = dirNames.map((dir) => ({
    slug: dir.split('/'),
  }))

  return slugs
}

//Get Post based on Slug
export const getPostdata = async (slug: string | undefined, lang: string | undefined) => {
  let fullPath = path.join(postDirectory, `${slug}/${lang}.mdx`)
  let postContent
  let translated = true

  if (existsSync(fullPath)) {
    postContent = readFileSync(fullPath, 'utf8')
  } else {
    translated = false
    fullPath = path.join(postDirectory, `${slug}/es.mdx`)
    postContent = readFileSync(fullPath, 'utf8')
  }

  return { postContent, translated }
}

export const getYamlData = async (file: string | undefined, lang: string | undefined) => {
  const cv_files = path.join(contentDirectory, 'cv')
  const fullPath = path.join(cv_files, `${file}.${lang}.yaml`)
  const data = readFileSync(fullPath, 'utf8')

  return YAML.parse(data)
}
