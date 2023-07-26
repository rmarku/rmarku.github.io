import { Metadata } from '@/lib/fileUtils'
import { SupportedLanguages } from '@/lib/i18n'

import Career from './Carreer'
import Education from './Education'
import Header from './Header'
import Interests from './Interests'
import Journal from './Journal'
import Languages from './Languages'
import Skills from './Skills'
import TeachingCompn from './Teaching'
import WorkExp from './Workexp'

type HeaderProps = {
  lng: SupportedLanguages
  info: Metadata
}
const CV: React.FC<HeaderProps> = ({ lng, info }) => {
  return (
    <div className='cv'>
      <Header lng={lng} basics={info.basics} />
      <Career lng={lng} summary={info.summary} />
      <div className='flex justify-evenly'>
        <div className='w-2/3 p-10 print:p-2'>
          <WorkExp lng={lng} experience={info.experiences} />
        </div>
        <div className='w-1/3 p-10 print:p-4 cv-side'>
          <Languages lng={lng} language={info.basics.languages} />
          <Skills lng={lng} skills={info.basics.skills} />
          <Interests lng={lng} interests={info.basics.interests} />
        </div>
      </div>
      <Education lng={lng} educations={info.educations} />
      <TeachingCompn lng={lng} teaching={info.teaching} />
      <Journal lng={lng} journals={info.journals} />
    </div>
  )
}

export default CV
