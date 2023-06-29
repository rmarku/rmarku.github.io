import { faChevronCircleRight, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Language } from '@/lib/fileUtils'
import { SupportedLanguages, useTranslation } from '@/lib/i18n'

type CareerProps = {
  lng: SupportedLanguages
  language: Language[]
}
const Languages: React.FC<CareerProps> = async ({ lng, language }) => {
  const { t } = useTranslation(lng, 'common')
  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faLanguage} className='mr-3' /> {t('languages')}
      </h2>
      <ul>
        {language.map((l, i) => (
          <li key={i}>
            <span className='cvbadged float-right'>{t(`language.${l.fluency}`)}</span>
            <FontAwesomeIcon icon={faChevronCircleRight} /> {l.name[lng]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Languages
