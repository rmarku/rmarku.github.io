import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
//const ReactMarkdown = require('react-markdown')






const Skills = (props) => {
    return (
        <article>
            <header>
                <h2><FontAwesomeIcon icon={faWrench} /> Skills</h2>
                <small>Jr = 1-5 yrs | Spec = 5-10 yrs | Exp >= 10+ yrs</small>
            </header>

            {props.skills.map((type) =>
                <div className='dont-break'>
                    <h4>{type.type}</h4>
                    {type.list.map((skill) =>
                        <div style={{ 'padding-left': '20px' }}>
                            {skill.name}
                            <span className='right'>{skill.level > 50 ? (skill.level ==100)?'Exp':'Spec' : 'Jr'}</span>
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
                </div>
            )}
        </article>
    )
}

export default Skills