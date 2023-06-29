import { CV } from '@/components/cv'
import { getUserResume } from '@/lib/fileUtils'
import { SupportedLanguages, languages } from '@/lib/i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}
export default async function Page({ params: { lng } }: { params: { lng: SupportedLanguages } }) {
  const info = getUserResume(lng)
  return (
    <>
      <CV lng={lng} info={info} />
    </>
  )
}
