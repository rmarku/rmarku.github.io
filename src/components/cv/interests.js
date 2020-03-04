import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
//const ReactMarkdown = require('react-markdown')






const Interests = (props) => {

    return (
        <article>
            <header>
                <h2><FontAwesomeIcon icon={faLightbulb} /> Interests</h2>
            </header>
            <ul>
                {props.interests.map((interest) =>
                    <li class="list-unstyled">
                        <FontAwesomeIcon icon={faChevronCircleRight} /> {interest.name}
                    </li>
                )}
            </ul>
        </article>
    )
}

export default Interests