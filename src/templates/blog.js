import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from "moment"
import 'moment/locale/es'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      body
    }
  }
`

const Blog = (props) => {
  return (
    <Layout>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      <time datetime={moment.unix(props.data.mdx.frontmatter.date).format('YYYY-MM-DD')}>{
        moment.unix(props.data.mdx.frontmatter.date).format('MMMM D, YYYY')
      }</time>
      
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

export default Blog
