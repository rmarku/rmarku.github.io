import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/react'
import { defineMessage } from "@lingui/macro"

const fluency = [
  defineMessage({ message: "Nativo" }),
  defineMessage({ message: "Oral y escrito avanzado" }),
]

const Lang = ({ langs }) => {
  return (
    <div className="language">
      <h2>
        <FontAwesomeIcon icon={faLanguage} /> <Trans id="Idiomas" />
      </h2>

      <ul>
        {langs.map((language, i) => (
          <li key={i}>
            <FontAwesomeIcon icon={faChevronCircleRight} /> {language.language}
            <span><Trans id={language.fluency} /></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lang
