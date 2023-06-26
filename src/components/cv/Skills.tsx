import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'

type SkillsProps = {
  lng: SupportedLanguages
  skills: { type: string; list: { name: string; level: number }[] }[]
}
const Skills: React.FC<SkillsProps> = async ({ lng, skills }) => {
  const { t } = useTranslation(lng, 'common')
  function skillLvl(l: number): string {
    if (l == 100) return 'Exp'
    if (l > 50) return 'Spec'
    return 'Jr'
  }
  // Sort skills
  for (const s of skills) {
    s.list.sort((a, b) => {
      return b.level - a.level
    })
  }

  return (
    <div className='skills'>
      <h2>
        <FontAwesomeIcon icon={faWrench} className='mr-3' />
        {t('habilites')}
      </h2>
      <small className='text-right w-full block'>
        Jr = 1-3 {t('years')} | Spec = 3-7 {t('years')} | Exp &gt;= 7+ {t('years')}
      </small>

      {skills.map((s) => (
        <div key={s.type} className='mb-4'>
          <h4 className='font-bold'>{s.type}</h4>
          {s.list.map((skill) => (
            <div key={skill.name} className='pl-3'>
              {skill.name}
              <span className='cvbadged float-right'>{skillLvl(skill.level)}</span>
              <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-0.5'>
                <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: skill.level + '%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Skills
