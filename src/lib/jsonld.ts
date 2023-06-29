import { Language, Person, Role, Thing, WithContext } from 'schema-dts'

import { getUserResume } from './fileUtils'
import { SupportedLanguages } from './i18n'

export const person = (lng: SupportedLanguages): WithContext<Person> => {
  const { basics, summary, experiences, educations } = getUserResume(lng)

  const knowsAbout: Thing[] = []
  for (const s of basics.skills) {
    for (const i of s.list) {
      knowsAbout.push({
        '@type': 'Thing',
        name: i.name,
        additionalType: s.type,
      })
    }
  }
  const knowsLanguage: Language[] = basics.languages.map((l: any) => {
    return {
      '@type': 'Language',
      name: l.name[lng],
      alternateName: l.code,
      description: l.fluency,
    }
  })

  const p: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${basics.familyName}, ${basics.givenName} ${basics.additionalName}`,
    familyName: basics.familyName,
    givenName: basics.givenName,
    additionalName: basics.additionalName,
    alternateName: basics.alternateName,
    image: basics.image,
    gender: basics.gender,
    birthDate: basics.birthday.date,
    description: summary[lng],
    url: basics.website,
    email: basics.email,
    telephone: basics.phone,
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: basics.location.city,
        addressCountry: basics.location.countryCode,
      },
    },
    birthPlace: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: basics.birthday.location.city,
        addressCountry: basics.birthday.location.countryCode,
      },
    },
    height: {
      '@type': 'QuantitativeValue',
      unitCode: 'CMT',
      value: basics.height,
    },
    weight: {
      '@type': 'QuantitativeValue',
      unitCode: 'KGM',
      value: basics.weight,
    },
    knowsAbout: knowsAbout,
    knowsLanguage: knowsLanguage,
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Wilab',
        url: 'https://www.wilab.io',
      },
    ],
    sameAs: basics.profiles.map((p: any) => p.url),
    jobTitle: basics.jobTitles,
    alumniOf: educations
      .filter((e: any) => e.type)
      .map((e: any) => {
        return {
          '@type': e.type,
          url: e.url,
          name: e.name,
        }
      }),

    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Computer Engineering',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          url: 'https://www.ucc.edu.ar',
          name: 'Universidad Católica de Córdoba',
        },
      },
    ],
  }

  return p
}
