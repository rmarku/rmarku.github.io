/* eslint-disable react/no-unescaped-entities */
import { faGlobe, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'
import { JournalT } from './types'

type JournalProps = {
  lng: SupportedLanguages
  journals: JournalT[]
}
const Journal: React.FC<JournalProps> = async ({ lng, journals }) => {
  const { t } = useTranslation(lng, 'common')

  return (
    <div className='px-10'>
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> {t('journals')}
      </h2>

      <ul>
        {journals.map((journal) => (
          <li key={journal.title} className='mt-6'>
            <b>"{journal.title}"</b>, {journal.authors} - <i>{journal.journal}</i> - ({journal.date})
            {journal.ISSN ? <i> ISSN: {journal.ISSN}</i> : ''}
            {journal.website ? (
              <p>
                <FontAwesomeIcon icon={faGlobe} /> <a href={journal.website}>article</a>
              </p>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Journal
