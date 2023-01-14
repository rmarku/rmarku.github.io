import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/react'

const Interests = (props) => {
  return (
    <div className='interests'>
      <h2>
        <FontAwesomeIcon icon={faLightbulb} /> <Trans id="Intereses" />
      </h2>
      <ul>
        {props.interests.map((interest, i) => (
          <li className="list-unstyled" key={i}>
            <FontAwesomeIcon icon={faChevronCircleRight} /> {interest.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Interests
