import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Trans } from '@lingui/react'

const Teaching = (props) => {
  function GetDetails({ det }) {
    const Component = useMemo(() => getMDXComponent(det), [det])
    return <Component />
  }
  return (
    <div className="teaching">
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> <Trans id="Enseñanza" />
      </h2>
      {props.teaching.map((univ, i) => (
        <div key={i} className='mt-5'>
          <h3>{univ.university}</h3>

          <div className='flex flex-wrap'>
            {univ.subjects.map((teach, i) => (
              <div className="md:w-1/2" key={i}>
                <h4>{teach.subject}</h4>
                <small>{teach.position}</small>{' - '}
                <span className="pt-7 text-sm text-gray-400">{teach.period}</span>
                {teach.details ? (
                  <>
                    <h5><Trans id="Detalles:" /></h5>
                    <GetDetails det={teach.details} />
                  </>
                ) : ('')}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Teaching
