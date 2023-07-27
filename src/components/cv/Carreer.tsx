import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Summary } from '@/lib/fileUtils'
import { SupportedLanguages, initI18next, useTranslation } from '@/lib/i18n'

type CareerProps = {
  lng: SupportedLanguages
  summary: Summary
}
const Career: React.FC<CareerProps> = async ({ lng, summary }) => {
  const { t } = initI18next(lng, 'common')
  const text = summary[lng]

  return (
    <div className='px-10 print:p-2'>
      <h2>
        <FontAwesomeIcon icon={faUser} /> {t('career_summary')}
      </h2>
      <p>{text}</p>
    </div>
  )
}
export default Career
