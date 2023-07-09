export type SupportedLanguages = 'es' | 'en'
export type Locales = Record<SupportedLanguages, string>

const languages: SupportedLanguages[] = ['es', 'en']
const locales: Locales = { es: 'es_AR', en: 'en_US' }
const fallbackLng: SupportedLanguages = languages[0]
const fallbackNS = ['common', 'metadata']
const defaultNS = fallbackNS[0]

export { defaultNS, fallbackNS, fallbackLng, languages, locales }
