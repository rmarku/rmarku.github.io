import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from "gatsby-plugin-intl"
const ReactMarkdown = require('react-markdown')







const WorkExp = (props) => {
    return (
        <article>
            <header>
                <h2><FontAwesomeIcon icon={faSuitcase} /> <FormattedMessage id="work_exp" /></h2>
            </header>
            <ul className="timeline">
                {props.exp.map((experience,i) =>
                    <li key={i}>
                        <h3 className=" d-inline-block">{experience.position}</h3>
                        <div className="float-right font-weight-bold">{experience.organization}</div>
                        <div className="resume-time">{experience.period}</div>
                        {experience.detail ?
                            <>
                                <h4> <FormattedMessage id="details" /></h4>
                                <ReactMarkdown source={experience.detail} />
                            </> : ''}
                        {(experience.technology) ?
                            <div className="tech_used">
                                <h4>Used Technologies</h4>
                                <ul className="list-inline">
                                    {experience.technology.map((tech,i) =>
                                        <li className="list-inline-item" key={i}>
                                            <span className="badge badge-primary badge-pill">{tech}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            : ''}
                    </li>
                )}
            </ul>
        </article>
    )
}

export default WorkExp