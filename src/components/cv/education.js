import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
const ReactMarkdown = require('react-markdown')


const Education = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>

            <ul>
                {props.educations.map((degree) =>
                    <>
                        <li class="item-list-s">
                            <h3 class=" d-inline-block">{degree.degree}</h3>
                            <div class="float-right font-weight-bold">{degree.university}</div>
                            <div class="resume-time">{degree.period}</div>

                            {(degree.detail) ?
                                <>
                                    <h5>Detalles</h5>
                                    <ReactMarkdown source={degree.detail} />
                                </>
                                : ''}
                        </li>
                    </>
                )}
            </ul>
        </>
    )
}

export default Education