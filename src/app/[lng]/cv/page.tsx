import { readFileSync } from 'fs'
import path from 'path'
import YAML from 'yaml'

import { CV } from '@/components/cv'
import { SupportedLanguages, languages } from '@/lib/i18n'
import { ContentDirectory } from '@/lib/posts'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}
export default async function Page({ params: { lng } }: { params: { lng: SupportedLanguages } }) {
  const cvFile = path.join(ContentDirectory, `metadata.yml`)
  const data = readFileSync(cvFile, 'utf8')
  const info = YAML.parse(data)
  return (
    <>
      <CV lng={lng} info={info} />
    </>
  )
}
