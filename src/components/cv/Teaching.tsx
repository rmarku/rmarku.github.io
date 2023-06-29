import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/es'

import { Teaching } from '@/lib/fileUtils'
import { SupportedLanguages, useTranslation } from '@/lib/i18n'

import Details from './Details'

type TeachingProps = {
  lng: SupportedLanguages
  teaching: Teaching[]
}

const TeachingComp: React.FC<TeachingProps> = async ({ lng, teaching }) => {
  const { t } = useTranslation(lng, 'common')
  moment.locale(lng)

  for (const university of teaching) {
    for (const e of university.subjects) {
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

    university.subjects.sort((a, b) => {
      if (b.period.duration && a.period.duration) {
        return b.period.duration?.minutes() - a.period.duration?.minutes()
      } else {
        return 0
      }
    })
  }

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} /> {t('teaching')}
      </h2>
      {teaching.map((univ) => (
        <div key={univ.university} className='mt-5'>
          <h3>{univ.university}</h3>

          <div className='flex flex-wrap'>
            {univ.subjects.map((teach) => (
              <div className='md:w-1/2 px-7' key={teach.subject}>
                <h4 className='text-lg font-bold underline'>{teach.subject}</h4>
                <small>{teach.position}</small> | <span className='period'>{teach.period.text}</span>
                <Details lng={lng} detail={teach.details} />
              </div>
            ))}
            <hr />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeachingComp
