import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
const ReactMarkdown = require('react-markdown')


const Teaching = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Teaching</h2>

            <ul>
                {props.teaching.map((teach) =>
                    <li class="item-list-s">
                        {teach.subject}
                        <div class="float-right font-weight-bold">{teach.university}</div>
                        <br />
                        <small>{teach.position}</small> - <span
                            class="resume-time">{teach.period} </span>

                        {(teach.details) ?
                            <>
                                <h5>Details</h5>
                                <ReactMarkdown source={teach.detail} />
                            </>
                            : ''}

                    </li>
                )}
            </ul>
        </>
    )
}

export default Teaching