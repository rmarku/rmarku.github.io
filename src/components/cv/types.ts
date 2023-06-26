export type Translatable = {
  es: string
  en: string
}

export type Period = {
  start: string
  end: string
  text?: string
  duration?: moment.Duration
}

export type Experience = {
  organization: string
  position: Translatable
  period: Period
  detail?: Translatable
  technology?: string[]
}

export type Teaching = {
  university: string
  subjects: Subject[]
}

export type Subject = {
  subject: string
  position: 'assistant' | 'professor'
  period: {
    start: string
    end: string
    text?: string
    duration?: moment.Duration
  }
  details: Translatable
}

export type Education = {
  degree: string
  university: string
  period?: string
  detail: Translatable
}

export type JournalT = {
  authors: string
  title: string
  journal: string
  date: string
  ISSN: string
  website: string
}
export type Summary = Translatable
