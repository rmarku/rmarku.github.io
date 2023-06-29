import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

import { Experience } from '@/lib/fileUtils'
import { SupportedLanguages, useTranslation } from '@/lib/i18n'

import Details from './Details'

type CareerProps = {
  lng: SupportedLanguages
  experience: Experience[]
}

const WorkExp: React.FC<CareerProps> = async ({ lng, experience }) => {
  const { t } = useTranslation(lng, 'common')

  // Sort work
  for (const e of experience) {
    const startDate = moment(e.period.start)
    const start = startDate.format(t('period_date'))
    let end = moment(e.period.end).format(t('period_date'))
    let duration = moment.duration(startDate.diff(end))

    if (moment(e.period.end).isAfter(moment())) {
      end = t('present')
      duration = moment.duration(startDate.diff(moment()))
    }
    e.period.duration = duration
    e.period.text = `${start} - ${end} (${duration.humanize()})`
  }
  experience.sort((a, b) => {
    return b.period.start > a.period.start ? 1 : -1
  })

  const Technology: React.FC<{ technology: string[] | undefined }> = ({ technology }) => {
    if (technology)
      return (
        <>
          <h4 className='text-lg font-bold'>{t('technologies')} </h4>
          <ul>
            {technology.map((tech, i) => (
              <li className='inline-block' key={i}>
                <span className='cvbadged float-right'>{tech}</span>
              </li>
            ))}
          </ul>
        </>
      )
    else return <></>
  }

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faSuitcase} /> {t('experiences')}
      </h2>

      <ul className='relative border-l border-gray-200 dark:border-gray-500'>
        {experience.map((exp) => (
          <li key={exp.organization + exp.period} className='mb-10 ml-4'>
            <div className='absolute w-6 h-6 bg-gray-200 rounded-full -left-3 border-2 border-white dark:border-white dark:bg-gray-900'></div>
            <div className='float-right font-bold ml-7'>{exp.organization}</div>
            <h3>{exp.position[lng]}</h3>
            <span className='period'>{exp.period.text}</span>
            <Details lng={lng} detail={exp.detail} />
            <Technology technology={exp.technology} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkExp
