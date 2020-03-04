import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
//const ReactMarkdown = require('react-markdown')


const Lang = (props) => {
    return (
        <article>
            <header>
                <h2><FontAwesomeIcon icon={faLanguage} /> Languages</h2>
            </header>

            <ul>
                {props.langs.map((language) =>
                    <>
                        <li class="list-unstyled">
                            <FontAwesomeIcon icon={faChevronCircleRight} /> {language.language}

                            <small class="text-muted"><span
                                class="badge badge-primary badge-pill float-right">{language.fluency}</span></small>

                        </li>
                    </>
                )}
            </ul>
        </article>
    )
}

export default Lang