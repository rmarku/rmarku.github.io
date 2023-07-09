import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCake, faEnvelope, faGlobe, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Image from 'next/image'

import { Basics } from '@/lib/fileUtils'
import { SupportedLanguages, useTranslation } from '@/lib/i18n'

type CVHeaderProps = {
  lng: SupportedLanguages
  basics: Basics
}
const CVHeader: React.FC<CVHeaderProps> = async ({ lng, basics }) => {
  moment.locale(lng)
  const { t } = useTranslation(lng, 'common')
  const birthday = moment(basics.birthday.date).calendar()
  const years = moment().diff(moment(basics.birthday.date), 'years', false)

  return (
    <header className='flex justify-center'>
      <div className='mr-6'>
        <Image
          src='/images/photo.avif'
          alt='Martin Photo'
          width={200}
          height={200}
          className='object-cover rounded-2xl shadow-md'
        />
      </div>
      <div className='w-full md:w-2/4 sm:w-8/12'>
        <h1 className='mb-10 text-5xl text-center'>
          {`${basics.familyName}, ${basics.givenName} ${basics.additionalName}`}
        </h1>
        <div className='flex justify-around'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> {basics.email}
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} /> {basics.phone}
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarker} /> {`${basics.location.city}, ${basics.location.countryCode}`}
            </li>
            <li>
              <FontAwesomeIcon icon={faCake} /> {birthday} ({years} {t('years')})
            </li>
          </ul>
          <ul>
            <li>
              <a href={basics.website}>
                <FontAwesomeIcon icon={faGlobe} /> {basics.website}
              </a>
            </li>
            {basics.profiles.map((p) => {
              let icon: IconProp = 'album'
              switch (p.network) {
                case 'linkedin':
                  icon = faLinkedinIn
                  break
                case 'github':
                  icon = faGithub
                  break
                case 'twitter':
                  icon = faTwitter
                  break
              }
              return (
                <li key={p.url}>
                  <a href={p.url}>
                    <FontAwesomeIcon icon={icon} /> {p.username}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </header>
  )
}
export default CVHeader
