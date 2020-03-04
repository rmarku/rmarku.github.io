import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLanguage,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons"
//const ReactMarkdown = require('react-markdown')

const Lang = props => {
  return (
    <article>
      <header>
        <h2>
          <FontAwesomeIcon icon={faLanguage} />{" "}
          <FormattedMessage id="languages" />
        </h2>
      </header>

      <ul>
        {props.langs.map((language, i) => (
          <span key={i}>
            <li className="list-unstyled">
              <FontAwesomeIcon icon={faChevronCircleRight} />{" "}
              <FormattedMessage id={language.language} />
              <small className="text-muted">
                <span className="badge badge-primary badge-pill float-right">
                  <FormattedMessage id={language.fluency} />
                </span>
              </small>
            </li>
          </span>
        ))}
      </ul>
    </article>
  )
}

export default Lang
