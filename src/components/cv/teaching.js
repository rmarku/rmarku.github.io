import React from 'react'
import { FormattedMessage } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
const ReactMarkdown = require('react-markdown')


const Teaching = (props) => {
    
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} />  <FormattedMessage id="teaching" /></h2>
            <div className="universidad">
                {props.teaching.map((univ,i ) =>
                    <span key={i}>
                        <h3>{univ.university}</h3>

                        <ul className="two-cols">

                            {univ.subjects.map((teach, i) =>
                                <li className="item-list-s" key={i}>
                                    <strong>{teach.subject}</strong>
                                    <br />
                                    <small>{teach.position}</small> - <span
                                        className="resume-time">{teach.period} </span>

                                    {(teach.details) ?
                                        <>
                                            <h5><FormattedMessage id="details" /></h5>
                                            <ReactMarkdown source={teach.details} />
                                        </>
                                        : ''}

                                </li>
                            )}
                        </ul>
                    </span>
                )}
            </div>
        </>
    )
}

export default Teaching