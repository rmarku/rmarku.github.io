import Image from 'next/image'

import { getAllPostSlugs } from '@/lib/fileUtils'
import { SupportedLanguages, fallbackLng, initI18next, languages, useTranslation } from '@/lib/i18n'
import { getPostdata } from '@/lib/posts'

interface page {
  lng: string
  slug: string[]
}

export function generateStaticParams(): page[] {
  const slug = getAllPostSlugs()
  const ret: page[] = []

  for (const l of languages) {
    for (const sl of slug) {
      ret.push({ lng: l, slug: sl })
    }
  }
  return ret
}

export default async function Page({ params: { slug, lng } }: { params: { slug: string[]; lng: SupportedLanguages } }) {
  const { t } = initI18next(lng, 'common')
  const post = await getPostdata(slug.join('/'), lng, fallbackLng)

  return (
    <html>
      <body className='bg-transparent'>
        <div
          style={{
            background: `url("/images/posts/${post.thumbnail}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className={`relative w-[1200px] h-[630px] rounded-3xl border-2`}>
          <div className='p-8 rounded-3xl flex items-center bg-gradient-to-b from-white to-transparent'>
            <Image src='/icon.png' width={100} height={100} alt={'icon'} />
            <div className='items-center ml-5 rounded'>
              <h1 className='leading-normal text-9xl drop-shadow-[3px_3px_2px_rgba(0,0,0,0.6)]  mx-20 my-3 h-auto font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-700'>
                {t('title')}
              </h1>
            </div>
          </div>
          <div className='mx-10 text-4xl font-semibold bg-[rgb(0,0,0,0.3)] rounded-2xl p-3 mt-48 '>
            <p className='mx-10 truncate leading-normal text-white  drop-shadow-[3px_3px_2px_rgba(0,0,0,0.6)]'>
              <b>{t('article')}: </b>
              {post.title}
            </p>
          </div>
          <br />
        </div>
      </body>
    </html>
  )
}
