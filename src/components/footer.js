import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import footerStyles from './footer.module.scss'

const Footer = () => {
    const data = useStaticQuery(graphql`
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
            }
          }
        }
      }      
    `)
    const author = data.site.siteMetadata.author;

    return (

        <footer className={footerStyles.footer}>
        <p>Created by {author.name}, © 2019</p>
            <p><a href={"https://www.github.com/"+author.contact_info.github}><FontAwesomeIcon icon={faGithub} /></a></p>
        </footer>
    )
}

export default Footer