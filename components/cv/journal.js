/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/react'

const Journal = ({ journals }) => {
  return (
    <div className="journal">
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> <Trans id="Publicaciones" />
      </h2>

      <ul>
        {journals.map((journal, i) => (
          <li key={i}>
            <b>"{journal.title}"</b>,
            {journal.authors} - <i>{journal.journal}</i> - ({journal.date})
            {journal.ISSN ? <i> ISSN: {journal.ISSN}</i> : ''}
            {journal.website ? (
              <p>
                <FontAwesomeIcon icon={faGlobe} />{' '}
                <a href={journal.website}>article</a>
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
