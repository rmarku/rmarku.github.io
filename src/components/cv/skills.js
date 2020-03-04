import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
//const ReactMarkdown = require('react-markdown')






const Skills = (props) => {
    return (
        <>
            <h2><FontAwesomeIcon icon={faWrench} /> Skills</h2>

            {props.skills.map((type) =>
                <>
                    <h4>{type.type}</h4>
                    {type.list.map((skill) =>
                        <div style={{ 'padding-left': '20px' }}>
                            {skill.name}
                            <div class="progress" style={{ height: '5px' }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ 'background-color': '#434E5E', width: skill.level + '%' }}
                                    aria-valuenow={skill.level}
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default Skills