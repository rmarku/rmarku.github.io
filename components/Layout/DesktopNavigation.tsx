import Link from 'next/link'
import { PageLink } from './Header'

type DesktopNavigationProps = {
  lng: string
  pages: PageLink[]
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ pages, lng }) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-4">
        {pages.map((page) => (
          <li key={page.text}>
            <Link href={`/${lng}${page.route}`} className="hover:text-blue-300">
              {page.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNavigation
