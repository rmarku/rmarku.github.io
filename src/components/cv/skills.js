import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWrench } from "@fortawesome/free-solid-svg-icons"
//const ReactMarkdown = require('react-markdown')

const Skills = props => {
  return (
    <article>
      <header>
        <h2>
          <FontAwesomeIcon icon={faWrench} /> <FormattedMessage id="skills" />
        </h2>
        <small>Jr = 1-5 yrs | Spec = 5-10 yrs | Exp >= 10+ yrs</small>
      </header>

      {props.skills.map((type, i) => (
        <div className="dont-break" key={i}>
          <h4>
            <FormattedMessage id={type.type} />
          </h4>
          {type.list.map((skill, i) => (
            <div style={{ paddingLeft: "20px" }} key={i}>
              {skill.name}
              <span className="right">
                {skill.level > 50
                  ? skill.level === 100
                    ? "Exp"
                    : "Spec"
                  : "Jr"}
              </span>
              <div className="progress" style={{ height: "5px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    backgroundColor: "#434E5E",
                    width: skill.level + "%",
                  }}
                  aria-valuenow={skill.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </article>
  )
}

export default Skills
