import { faChevronCircleRight, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Interest } from '@/lib/fileUtils'
import { SupportedLanguages, useTranslation } from '@/lib/i18n'

type InterestsProps = {
  lng: SupportedLanguages
  interests: Interest[]
}

const Interests: React.FC<InterestsProps> = async ({ lng, interests }) => {
  const { t } = useTranslation(lng, 'common')
  return (
    <div className='interests'>
      <h2>
        <FontAwesomeIcon icon={faLightbulb} className='mr-3' /> {t('interests')}
      </h2>
      <ul>
        {interests.map((interest, i) => (
          <li className='list-unstyled' key={i}>
            <FontAwesomeIcon icon={faChevronCircleRight} /> {interest.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Interests
