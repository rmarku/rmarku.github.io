import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Trans } from '@lingui/react'

const WorkExp = ({ exp }) => {
  function GetDetails({ det }) {
    const Component = useMemo(() => getMDXComponent(det), [det])
    return <Component />
  }

  return (
    <>
      <h2>
        <FontAwesomeIcon icon={faSuitcase} /> <Trans id="Experiencia Laboral" />
      </h2>

      <ul className="timeline">
        {exp.map((experience, i) => (
          <li key={i}>
            <h3>{experience.position}</h3>
            <div className="float-right font-bold mr-7">{experience.organization}</div>
            <div className="pt-7 text-sm text-gray-400">{experience.period}</div>
            {experience.detail ? (
              <div className="details">
                <h4> <Trans id="Detalles:" /></h4>
                <GetDetails det={experience.detail} />
              </div>
            ) : (
              ''
            )}
            {experience.technology ? (
              <div className="tech_used">
                <h4> <Trans id="Tecnologías Utilizadas" /></h4>
                <ul>
                  {experience.technology.map((tech, i) => (
                    <li className="inline-block" key={i}>
                      <span className="badge badge-primary badge-pill">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default WorkExp
