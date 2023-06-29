import { Toc, TocEntry } from '@stefanprobst/remark-extract-toc'
import Slugger from 'github-slugger'
import Link from 'next/link'

import { useTranslation } from '@/lib/i18n'
import { Post } from '@/lib/posts'

import ShareButtons from './ShareButtons'

export const SideBar: React.FC<{ post: Post; toc: Toc }> = ({ post, toc }) => {
  const { t } = useTranslation('es')
  return (
    <div className='w-1/4 border-l-2 px-5'>
      <h3>{t('share')}</h3>
      <ShareButtons url='https://pepe.go' />
      <h3>{t('toc')}</h3>
      <TOC entries={toc} />
    </div>
  )
}
type TOCProps = {
  entries: TocEntry[]
}

const slugs = new Slugger()
const TOC: React.FC<TOCProps> = ({ entries }) => {
  slugs.reset()
  return (
    <nav aria-label='Table of Contents' className='toc'>
      <ul>
        {entries.map((entry, index) => (
          <TOCItem key={index} entry={entry} />
        ))}
      </ul>
    </nav>
  )
}

type TOCItemProps = {
  entry: TocEntry
}

const TOCItem: React.FC<TOCItemProps> = ({ entry }) => {
  const { children, value } = entry
  let toc = <></>
  const slug = slugs.slug(value)

  if (children && children.length > 0) {
    toc = <TOC entries={children} />
  }

  return (
    <li>
      <Link href={`#${slug}`}>{value}</Link>
      {toc}
    </li>
  )
}

export default TOC
