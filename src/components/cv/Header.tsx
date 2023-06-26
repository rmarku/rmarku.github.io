import { faGithub, faLinkedinIn, faSkype } from '@fortawesome/free-brands-svg-icons'
import { faCake, faEnvelope, faGlobe, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Image from 'next/image'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'

type CVHeaderProps = {
  lng: SupportedLanguages
  author: any
}
const CVHeader: React.FC<CVHeaderProps> = async ({ lng, author }) => {
  const { t } = useTranslation(lng, 'common')
  const birthday = moment(author.contact_info.birthday).format('DD/MM/YYYY')
  const years = moment().diff(moment(author.contact_info.birthday), 'years', false)

  return (
    <header className='flex justify-center'>
      <div className='mr-6'>
        <Image src='/images/photo.avif' alt='Martin Photo' width={200} height={200} className='object-cover' />
      </div>
      <div className='w-full md:w-2/4 sm:w-8/12'>
        <h1 className='mb-10 text-5xl text-center'>{author.name}</h1>
        <div className='flex justify-around'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> {author.contact_info.email}
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} /> {author.contact_info.phone}
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarker} /> {author.contact_info.location}
            </li>
            <li>
              <FontAwesomeIcon icon={faCake} /> {birthday} ({years} {t('years')})
            </li>
          </ul>
          <ul>
            <li>
              <a href={author.contact_info.website}>
                <FontAwesomeIcon icon={faGlobe} /> {author.contact_info.website}
              </a>
            </li>
            <li>
              <a href={'https://www.linkedin.com/in/' + author.contact_info.linkedin}>
                <FontAwesomeIcon icon={faLinkedinIn} /> {author.contact_info.linkedin}
              </a>
            </li>
            <li>
              <a href={'https://www.github.com/' + author.contact_info.github}>
                <FontAwesomeIcon icon={faGithub} /> {author.contact_info.github}
              </a>
            </li>
            <li>
              <a href={'skype:' + author.contact_info.skype}>
                <FontAwesomeIcon icon={faSkype} /> {author.contact_info.skype}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
export default CVHeader
