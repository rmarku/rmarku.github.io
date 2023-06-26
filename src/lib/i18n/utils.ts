import { readFileSync } from 'fs'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import YAML from 'yaml'

import { ContentDirectory } from '../posts'
import { SupportedLanguages, defaultNS, fallbackLng, fallbackNS, languages } from './settings'

function getOptions(lng: SupportedLanguages = fallbackLng, ns: string = defaultNS) {
  return {
    supportedLngs: languages,
    initImmediate: false,
    fallbackLng,
    lng,
    fallbackNS,
    defaultNS,
    ns,
    saveMissing: true, // Must be set to true
    parseMissingKeyHandler: (key: string) => {
      const msg = `⚠️ No translation found for "${key}"`
      console.log(msg, new Error().stack?.split('\n')[5])
      return msg
    },
  }
}

const loadYamlResource = (language: string, namespace: string) => {
  const data = readFileSync(`${ContentDirectory}/i18n/${namespace}.${language}.yml`, 'utf8')
  return YAML.parse(data)
}

const initI18next = (lng: SupportedLanguages, ns: string) => {
  const i18nInstance = createInstance()
  i18nInstance.use(resourcesToBackend(loadYamlResource)).init(getOptions(lng, ns))
  return {
    t: i18nInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nInstance,
  }
}

function useTranslation(lng: SupportedLanguages, ns: string = defaultNS) {
  return initI18next(lng, ns)
}

export { useTranslation, getOptions, initI18next }
