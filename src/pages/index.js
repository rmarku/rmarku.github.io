import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import moment from "moment"
import 'moment/locale/es'


import Layout from '../components/layout'
import blogStyles from './index.module.scss'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
    query {
        allMdx (filter: {fields: {type: {eq: "blog"}}},
        sort: { fields: [frontmatter___date], order: DESC }){
            edges{
                node {
                    frontmatter {
                        title
                        date
                        description
                    }
                    fields {
                        slug
                        type
                    }
                }
            }
        }
    }
    `)
    moment.locale('es')

    return (
        <Layout>
            <main className={blogStyles.blog}>
                <h1>Blog</h1>
                {data.allMdx.edges.map((edge) => {
                    return (
                        <article>
                            <Link to={`${edge.node.fields.slug}`}>
                                <h2>{edge.node.frontmatter.title}</h2>
                                <time datetime={moment.unix(edge.node.frontmatter.date).format('YYYY-MM-DD')}>{
                                    moment.unix(edge.node.frontmatter.date).format('MMMM D, YYYY')
                                }</time><br />

                                <description>{edge.node.frontmatter.description}</description>
                            </Link>
                        </article>
                    )
                })}
            </main>
        </Layout>
    )
}

export default BlogPage