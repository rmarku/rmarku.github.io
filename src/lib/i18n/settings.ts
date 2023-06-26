export type SupportedLanguages = 'es' | 'en'

const languages: SupportedLanguages[] = ['es', 'en']
const fallbackLng: SupportedLanguages = languages[0]
const fallbackNS = ['common', 'metadata']
const defaultNS = fallbackNS[0]

export { defaultNS, fallbackNS, fallbackLng, languages }
