import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import moment from "moment"
import "moment/locale/es"

import SEO from "../components/SEO"
import Layout from "../components/layout"
import blogStyles from "./index.module.scss"

const BlogPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { fields: { type: { eq: "blog" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              description
            }
            fields {
              slug
              type
              lang
            }
          }
        }
      }
    }
  `)
  const intl = useIntl()
  const { locale, defaultLocale } = intl
  const { locale: lang, messages } = intl
  const title = messages["site-title"]
  const description = messages["site-description"]
  moment.locale(locale)

  // Filtro por lenguaje

  const slugs = new Set()
  for (const { node } of data.allMdx.edges) slugs.add(node.fields.slug)

  const nodes = []
  for (const sl of slugs) {
    const { node } =
      data.allMdx.edges.find(
        ({
          node: {
            fields: { lang, slug },
          },
        }) => slug === sl && lang === locale
      ) ||
      data.allMdx.edges.find(
        ({
          node: {
            fields: { lang, slug },
          },
        }) => slug === sl && lang === defaultLocale
      )

    if (node) nodes.push(node)
  }

  return (
    <Layout>
      <SEO {...{ lang, title, description, location, slug: "/" }} />
      <main className={blogStyles.blog}>
        <h1>Blog</h1>
        {nodes.map(node => {
          return (
            <article key={node.fields.slug}>
              <Link to={node.fields.slug}>
                <h2>{node.frontmatter.title}</h2>
                <time
                  dateTime={moment
                    .unix(node.frontmatter.date)
                    .format("YYYY-MM-DD")}
                >
                  {moment.unix(node.frontmatter.date).format("MMMM D, YYYY")}
                </time>
                <br />

                <p>{node.frontmatter.description}</p>
              </Link>
            </article>
          )
        })}
      </main>
    </Layout>
  )
}

export default BlogPage
