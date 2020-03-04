import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'

import { Container, Row, Col, Figure } from 'react-bootstrap';
import foto from "../../content/assets/img/photo.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, useStaticQuery } from 'gatsby'

import   '../components/cv/style.css'
import WorkExp from '../components/cv/workexp'
import Skills from '../components/cv/skills';
import Lang from '../components/cv/languages';
import Interests from '../components/cv/interests';
import Education from '../components/cv/education';
import Teaching from '../components/cv/teaching';
import Journals from '../components/cv/journal';


const CV = () => {

    // Get document, or throw exception on error
    const { dataYaml } = useStaticQuery(graphql`
    query MyQuery {
        dataYaml {
          id
          info {
            name
            picture
            titles
          }
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
          }
          interests {
            name
          }
          teaching {
            details
            period
            position
            subject
            university
          }
          summary {
            description
          }
          skills {
            type
            list {
              level
              name
            }
          }
          languages {
            fluency
            language
          }
          journals {
            ISSN
            authors
            date
            journal
            title
            website
          }
          contact {
            email
            phone
            website
            github
            linkedin
          }
        }
      }
      
    `)
    console.log(dataYaml)
    return (
        <Container>
            <Row>
                <Col xs='3'>
                    <Figure.Image src={foto} width={200} thumbnail />
                </Col>
                <Col xs='9'>
                    <h1>
                        {dataYaml.info.name}
                    </h1>
                    <FontAwesomeIcon icon={faEnvelope} /> {dataYaml.contact.email}<br />
                    <FontAwesomeIcon icon={faPhone} /> {dataYaml.contact.phone}<br />
                    <FontAwesomeIcon icon={faGlobe} /> <a href={dataYaml.contact.website}>{dataYaml.contact.website}</a><br />
                    <FontAwesomeIcon icon={faLinkedinIn} /> <a href={"https://www.linkedin.com/in/" + dataYaml.contact.linkedin}>{dataYaml.contact.linkedin}</a><br />
                    <FontAwesomeIcon icon={faGithub} /> <a href={"https://www.github.com/" + dataYaml.contact.github}>{dataYaml.contact.github}</a>

                </Col>
            </Row>
            <Row>
                <Col>
                    <h2><FontAwesomeIcon icon={faUser} /> Career Summary</h2>
                    <p>{dataYaml.summary.description}</p>
                </Col>
            </Row>
            <Row>
                <Col xs='8'>
                    <WorkExp exp={dataYaml.experiences} />
                </Col>
                <Col>
                    <Skills skills={dataYaml.skills} />
                    <Lang langs={dataYaml.languages} />
                    <Interests interests={dataYaml.interests} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Education educations={dataYaml.educations} />
                    <Teaching teaching={dataYaml.teaching} />
                    <Journals journals={dataYaml.journals} />
                </Col>
            </Row>
        </Container>
    )
}


export default CV