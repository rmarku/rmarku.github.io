import { readFileSync, readdirSync } from 'fs'
import moment from 'moment'
import path from 'path'
import YAML from 'yaml'

import { SupportedLanguages } from './i18n'

export const ContentDirectory = path.join(process.cwd(), 'content')
export const PostDirectory = path.join(ContentDirectory, 'posts')

export function listFilesInDirectory(directory: string): string[] {
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

export function getDirNames(): string[] {
  return listFilesInDirectory(PostDirectory)
    .filter((f) => f.includes('es.mdx'))
    .map((d) => {
      return d.replace(PostDirectory + '/', '').replace('/es.mdx', '')
    })
}


export const getPostContent = (
  slug: string,
  locale: SupportedLanguages | undefined,
  defaultLocale: SupportedLanguages,
): { fileContents: string; post_lang: SupportedLanguages } => {
  const filesPath = path.join(PostDirectory, slug)
  const defaultFullPath = path.join(filesPath, defaultLocale + '.mdx')
  const fullPath = path.join(filesPath, locale + '.mdx')
  let post_lang = locale as SupportedLanguages
  //Extracts contents of the MDX file
  let fileContents
  try {
    fileContents = readFileSync(fullPath, 'utf8')
  } catch (e) {
    fileContents = readFileSync(defaultFullPath, 'utf8')
    post_lang = defaultLocale
  }
  return { fileContents, post_lang }
}

//Get Slugs
export const getAllPostSlugs = (): string[][] => {
  const dirNames = getDirNames()
  const slugs: string[][] = dirNames.map((dir) => dir.split('/'))

  return slugs
}

export const getUserResume = (lng: SupportedLanguages): Metadata => {
  const cvFile = path.join(ContentDirectory, `metadata.yml`)
  const data = readFileSync(cvFile, 'utf8')
  return YAML.parse(data)
}

// Metadata Types

export interface Metadata {
  basics: Basics
  summary: Summary
  experiences: Experience[]
  teaching: Teaching[]
  educations: Education[]
  journals: Journal[]
}

export interface Basics {
  familyName: string
  label: string
  jobTitles: string[]
  givenName: string
  additionalName: string
  alternateName: string
  image: string
  gender: string
  birthday: Birthday
  location: Location
  phone: string
  email: string
  website: string
  height: number
  weight: number
  profiles: Profile[]
  skills: Skill[]
  languages: Language[]
  interests: Interest[]
}

export interface Birthday {
  date: string
  location: Location
}

export interface Location {
  city: string
  countryCode: string
}

export interface Profile {
  username: string
  url: string
  network: string
}

export interface Skill {
  type: string
  list: List[]
}

export interface List {
  name: string
  level: number
}

export interface Language {
  name: Translatable
  code: string
  fluency: string
}

export interface Interest {
  name: string
}

export interface Summary extends Translatable {}

export interface Experience {
  organization: string
  position: Translatable
  period: Period
  detail?: Translatable
  technology?: string[]
}

export interface Translatable {
  es: string
  en: string
}

export interface Period {
  start: string
  end: string
  duration?: moment.Duration
  text?: string
}

export interface Teaching {
  university: string
  subjects: Subject[]
}

export interface Subject {
  subject: string
  position: string
  period: Period
  details: Translatable
}

export interface Education {
  degree: string
  name: string
  detail: any
  type?: string
  url?: string
  period?: string
}

export interface Journal {
  authors: string
  title: string
  journal: string
  date: string
  ISSN: string
  website: string
}
