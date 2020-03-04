import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import headerStyles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link activeClassName={headerStyles.activeNavItem} to="/">
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/">
              Blog
            </Link>
          </li>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/about">
              About
            </Link>
          </li>
          <li>
            <a activeClassName={headerStyles.activeNavItem} href="/cv"  target="_blank" >
              CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
