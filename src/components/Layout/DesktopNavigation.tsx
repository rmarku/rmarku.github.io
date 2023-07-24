import Link from 'next/link'

import { PageLink } from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'

type DesktopNavigationProps = {
  lng: string
  pages: PageLink[]
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ pages, lng }) => {
  return (
    <nav className='hidden md:block'>
      <ul className='flex space-x-4'>
        {pages.map((page) => (
          <li key={page.text}>
            <Link href={`/${lng}${page.route}/`} className='hover:text-blue-300 mx-2 font-bold'>
              {page.text}
            </Link>
          </li>
        ))}
				<li>
			<a href={`/feed-${lng}.xml`} >
			<FontAwesomeIcon icon={faRss} />
			</a>
				</li>
      </ul>
    </nav>
  )
}

export default DesktopNavigation
