import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"
const ReactMarkdown = require("react-markdown")

const Education = props => {
  return (
    <>
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} />{" "}
        <FormattedMessage id="education" />
      </h2>

      <ul>
        {props.educations.map((degree, i) => (
          <span key={i}>
            <li className="item-list-s">
              <h3 className=" d-inline-block">{degree.degree}</h3>
              <div className="float-right font-weight-bold">
                {degree.university}
              </div>
              <div className="resume-time">{degree.period}</div>

              {degree.detail ? (
                <>
                  <h5>
                    <FormattedMessage id="details" />
                  </h5>
                  <ReactMarkdown source={degree.detail} />
                </>
              ) : (
                ""
              )}
            </li>
          </span>
        ))}
      </ul>
    </>
  )
}

export default Education
