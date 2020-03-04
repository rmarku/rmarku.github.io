import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import moment from "moment"
import 'moment/locale/es'


import Layout from '../components/layout'
import blogStyles from './courses.module.scss'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx (filter: {fields: {type: {eq: "courses"}}}) {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                            description
                            univ
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
                <h1>Materias</h1>
                <p>En esta pagina tengo información sobre las distintas materias que dicto.</p>
                {data.allMdx.edges.map((edge) => {
                    const n = edge.node
                    return (
                        <article>
                            <Link to={`${n.fields.slug}`}>
                                <span className="univ">{n.frontmatter.univ}</span>
                                <h2>{n.frontmatter.title}</h2>
                                <time datetime={moment.unix(n.frontmatter.date).format('YYYY-MM-DD')}>{
                                    moment.unix(n.frontmatter.date).format('MMMM D, YYYY')
                                }</time><br />
                                
                                <description>{n.frontmatter.description}</description>
                            </Link>
                        </article>
                    )
                })}
            </main>
        </Layout>
    )
}

export default BlogPage