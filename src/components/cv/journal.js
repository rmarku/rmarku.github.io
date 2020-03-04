import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'



const Journal = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Journals</h2>

            <ul>
                {props.journals.map((journal) =>
                    <li>
                        <b>"{journal.title}"</b>, {journal.authors}
                        - <i>{journal.journal}</i> - ({journal.date})

                        {(journal.ISSN) ? <i> ISSN: {journal.ISSN}</i> : ''}
                        {(journal.website)
                         ?
                            <>
                                <br />
                                <i class="fa fa-globe"></i> <a href="{{ journal.website }}">{journal.website}</a>
                            </>
                            : ''}
                    </li>
                )}
            </ul>
        </>
    )
}

export default Journal