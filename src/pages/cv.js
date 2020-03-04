import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelope,
  faPhone,
  faGlobe,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import {
  faLinkedinIn,
  faGithub,
  faSkype,
} from "@fortawesome/free-brands-svg-icons"

import { Container, Row, Col, Figure } from "react-bootstrap"
import foto from "../../content/assets/img/photo.jpg"
import "bootstrap/dist/css/bootstrap.min.css"
import { graphql, useStaticQuery } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import "../components/cv/style.css"
import "../components/cv/print.scss"

import SelectLanguage from "../components/selectLanguage"
import WorkExp from "../components/cv/workexp"
import Skills from "../components/cv/skills"
import Lang from "../components/cv/languages"
import Interests from "../components/cv/interests"
import Education from "../components/cv/education"
import Teaching from "../components/cv/teaching"
import Journals from "../components/cv/journal"

const CV = () => {
  // Get document, or throw exception on error
  const {
    site: {
      siteMetadata: { author },
    },
    allDataYaml: { edges },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author {
            name
            contact_info {
              github
              linkedin
              phone
              skype
              website
              email
            }
            picture
            skills {
              type
              list {
                level
                name
              }
            }
            title
            languages {
              fluency
              language
            }
            interests {
              name
            }
          }
        }
      }
      allDataYaml {
        edges {
          node {
            educations {
              degree
              detail
              period
              university
            }
            experiences {
              detail
              organization
              period
              position
              technology
            }
            journals {
              ISSN
              authors
              date
              journal
              title
              website
            }
            lang
            teaching {
              university
              subjects {
                details
                period
                position
                subject
              }
            }
            summary
          }
        }
      }
    }
  `)

  const intl = useIntl()
  const { locale } = intl

  const { node } = edges.find(e => e.node.lang === locale)

  for (let group of author.skills) {
    group.list.sort((a, b) => b.level - a.level)
  }

  return (
    <Container>
      <Row>
        <Col xs="3">
          <Figure.Image src={foto} width={200} thumbnail />
        </Col>
        <Col xs="9">
          <SelectLanguage />
          <h1>{author.name}</h1>
          <FontAwesomeIcon icon={faEnvelope} /> {author.contact_info.email}
          <br />
          <FontAwesomeIcon icon={faPhone} /> {author.contact_info.phone}
          <br />
          <FontAwesomeIcon icon={faGlobe} />{" "}
          <a href={author.contact_info.website}>
            {author.contact_info.website}
          </a>
          <br />
          <FontAwesomeIcon icon={faLinkedinIn} />{" "}
          <a
            href={"https://www.linkedin.com/in/" + author.contact_info.linkedin}
          >
            {author.contact_info.linkedin}
          </a>
          <br />
          <FontAwesomeIcon icon={faGithub} />{" "}
          <a href={"https://www.github.com/" + author.contact_info.github}>
            {author.contact_info.github}
          </a>
          <br />
          <FontAwesomeIcon icon={faSkype} />{" "}
          <a href={"skype:" + author.contact_info.skype}>
            {author.contact_info.skype}
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>
            <FontAwesomeIcon icon={faUser} /> {intl.formatMessage({ id: "career_summary" })}
          </h2>
          <p>{node.summary}</p>
        </Col>
      </Row>
      <Row>
        <Col xs="8">
          <WorkExp exp={node.experiences} />
        </Col>
        <Col>
          <Lang langs={author.languages} />
          <Skills skills={author.skills} />
          <Interests interests={author.interests} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Education educations={node.educations} />
          <Teaching teaching={node.teaching} />
          <Journals journals={node.journals} />
        </Col>
      </Row>
    </Container>
  )
}

export default CV
