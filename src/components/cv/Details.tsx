import ReactMarkdown from 'react-markdown'

import { SupportedLanguages, useTranslation } from '@/lib/i18n'

import { Translatable } from './types'

type DetailsProps = {
  lng: SupportedLanguages
  detail: Translatable | undefined
}
const Details: React.FC<DetailsProps> = ({ lng, detail, ...props }) => {
  const { t } = useTranslation(lng, 'common')
  if (detail) {
    const text = detail[lng]
    return (
      <div {...props}>
        <h4 className='text-lg font-bold'>{t('details')}:</h4>
        <ReactMarkdown className='markdown my-0'>{text}</ReactMarkdown>
      </div>
    )
  } else return <></>
}
export default Details
