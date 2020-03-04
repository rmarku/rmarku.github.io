import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
const ReactMarkdown = require('react-markdown')


const Teaching = (props) => {
    console.log(props.teaching)
    return (
        <>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Teaching</h2>
            <div className="universidad">
                {props.teaching.map((univ) =>
                    <>
                        <h3>{univ.university}</h3>

                        <ul className="two-cols">

                            {univ.subjects.map((teach) =>
                                <li className="item-list-s">
                                    <strong>{teach.subject}</strong>
                                    <br />
                                    <small>{teach.position}</small> - <span
                                        className="resume-time">{teach.period} </span>

                                    {(teach.details) ?
                                        <>
                                            <h5>Details</h5>
                                            <ReactMarkdown source={teach.details} />
                                        </>
                                        : ''}

                                </li>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </>
    )
}

export default Teaching