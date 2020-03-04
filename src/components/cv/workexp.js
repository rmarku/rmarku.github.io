import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
const ReactMarkdown = require('react-markdown')






const WorkExp = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faSuitcase} /> Working Exprerience</h2>
            <ul className="timeline">
                {props.exp.map((experience) =>
                    <li>
                        <h3 className=" d-inline-block">{experience.position}</h3>
                        <div className="float-right font-weight-bold">{experience.organization}</div>
                        <div className="resume-time">{experience.period}</div>
                        <h4> Details</h4>
                        <ReactMarkdown source={experience.detail} />
                        {(experience.technology) ?
                            <div className="tech_used">
                                <h4>Used Technologies</h4>
                                <ul className="list-inline">
                                    {experience.technology.map((tech) =>
                                        <li className="list-inline-item">
                                            <span className="badge badge-primary badge-pill">{{ tech }}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            : ''}
                    </li>
                )}
            </ul>
        </>
    )
}

export default WorkExp