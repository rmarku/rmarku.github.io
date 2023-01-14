import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Trans } from '@lingui/react'

const Education = ({ educations }) => {
  function GetDetails({ det }) {
    const Component = useMemo(() => getMDXComponent(det), [det])
    return <Component />
  }

  return (
    <div className='education'>
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> <Trans id="Educacion" />
      </h2>

      <ul>
        {educations.map((degree, i) => (
          <li key={i}>
            <h3>{degree.degree}</h3>
            <div className='float-right font-bold'>{degree.university}</div>
            <div className="pt-7 text-sm text-gray-400">{degree.period}</div>
            {degree.detail ? (
              <span>
                <h4><Trans id="Detalles:" /></h4>
                <GetDetails det={degree.detail} />
              </span>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Education
