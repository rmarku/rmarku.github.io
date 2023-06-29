import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'

import Details from './Details'
import {Education} from '@/lib/fileUtils'


type EducationProps = {
  lng: SupportedLanguages
  educations: Education[]
}
const Education: React.FC<EducationProps> = async ({ lng, educations }) => {
  const { t } = useTranslation(lng, 'common')

  return (
    <div className='px-10'>
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> {t('education')}
      </h2>

      <ul>
        {educations.map((degree) => (
          <li key={degree.degree} className='mt-6'>
            <div className='float-right font-bold'>{degree.name}</div>
            <h3 className='font-bold'>{degree.degree}</h3>
            <span className='period ml-3)'>{degree.period}</span>
            <Details lng={lng} detail={degree.detail} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Education
