import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author {
          name
        }
      }
    }
  }
`

function SEO({
  location,
  title,
  description = "",
  lang = "en",
  meta = [],
  slug = null,
  thumbnail = null,
  ...props
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query)
  const metaDescription = description || siteMetadata.description


  const metaTags = [
    {
      name: "description",
      content: metaDescription,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: slug ? "summary_large_image" : "summary",
    },
    {
      name: "twitter:creator",
      content: siteMetadata.author.name,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
  ].concat(meta)

  return (
    <Helmet
      {...props}
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={metaTags}
    />
  )
}

export default SEO
