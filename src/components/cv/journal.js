import React from 'react'
import { FormattedMessage } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faGlobe } from '@fortawesome/free-solid-svg-icons'



const Journal = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> <FormattedMessage id="journals" /></h2>

            <ul>
                {props.journals.map((journal,i ) =>
                    <li key={i}>
                        <b>"{journal.title}"</b>, {journal.authors}
                        - <i>{journal.journal}</i> - ({journal.date})

                        {(journal.ISSN) ? <i> ISSN: {journal.ISSN}</i> : ''}
                        {(journal.website)
                         ?
                            <>
                                <br />
                                <FontAwesomeIcon icon={faGlobe} /> <a href="{{ journal.website }}">{journal.website}</a>
                            </>
                            : ''}
                    </li>
                )}
            </ul>
        </>
    )
}

export default Journal