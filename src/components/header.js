import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

import headerStyles from "./header.module.scss"
import SelectLang from "./selectLanguage"

const Header = () => {
  const intl = useIntl()
  const {  messages } = intl
  const title = messages["site-title"]
  const subtitle = messages["site-subtitle"]

  return (
    <header className={headerStyles.header}>
    <SelectLang/>
      <small style={{float: 'right',marginRight:'30px'}}>{subtitle}</small>
      <h1>
        <Link activeClassName={headerStyles.activeNavItem} to="/">
          {title}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/">
            {intl.formatMessage({ id: "Blog" })}
            </Link>
          </li>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/courses">
            <FormattedMessage id="Courses" />
            </Link>
          </li>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/about">
            {intl.formatMessage({ id: "About" })}
            </Link>
          </li>
          <li>
            <a activeclassname={headerStyles.activeNavItem} href="/cv"  target="_blank" >
            {intl.formatMessage({ id: "CV" })}
            </a>
          </li>
          <li>
            <Link activeClassName={headerStyles.activeNavItem} to="/uses">
            {intl.formatMessage({ id: "Uses" })}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
