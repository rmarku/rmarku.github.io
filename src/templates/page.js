import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import {  useIntl } from "gatsby-plugin-intl"
import moment from "moment"
import 'moment/locale/es'

import Layout from '../components/layout'

export const query = graphql`
query ($slug: String!) {
  allMdx(filter: {fields: {slug: {eq: $slug}}}) {
    edges {
      node {
        frontmatter {
          title
          date
        }
        fields {
          lang
          slug
        }
        body
      }
    }
  }
}
`

const emptyPage = {
  body: '<p>unknown content</p>',
  frontmatter: {
    description: '',
    title: 'unknown content',
    date: new Date()
  },
}

const Page = (props) => {

  const intl = useIntl();
  const { locale, defaultLocale } = intl;
  const { node } =
    props.data.allMdx.edges.find(({ node: { fields: { lang } } }) => lang === locale) ||
    props.data.allMdx.edges.find(({ node: { fields: { lang } } }) => lang === defaultLocale) ||
    { node: emptyPage };

  moment.locale(locale)
  return (
    <Layout>
      <MDXRenderer>{node.body}</MDXRenderer>
    </Layout>
  )
}

export default Page
