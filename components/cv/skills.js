import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/react'

const Skills = (props) => {
  return (
    <div className="skills">
      <h2>
        <FontAwesomeIcon icon={faWrench} /><Trans id="Habilidades" />
      </h2>
      <small>Jr = 1-3 <Trans id="años" /> <br /> Spec = 3-7 <Trans id="años" /> <br /> Exp &gt;= 7+ <Trans id="años" /></small>

      {props.skills.map((type, i) => (
        <div key={i}>
          <h4>{type.type}</h4>
          {type.list.map((skill, i) => (
            <div style={{ paddingLeft: '20px' }} key={i}>
              {skill.name}
              <span>{skill.level > 50 ? (skill.level === 100 ? 'Exp' : 'Spec') : 'Jr'}</span>
              <div className="progress">
                <div style={{ width: skill.level + '%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Skills
