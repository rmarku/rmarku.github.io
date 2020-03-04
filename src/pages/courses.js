import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import moment from "moment"
import 'moment/locale/es'


import Layout from '../components/layout'
import blogStyles from './courses.module.scss'

const CourcesPage = () => {
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
                            lang
                        }
                    }
                }
            }
        }
    `)
    const intl = useIntl();
    const { locale, defaultLocale } = intl;
    moment.locale(locale)

    // Filtro por lenguaje

    const slugs = new Set();
    for (const {node} of data.allMdx.edges)
        slugs.add(node.fields.slug);


    const nodes = [];
    for (const sl of slugs) {
        const { node } =
            data.allMdx.edges.find(({ node: { fields: { lang, slug } } }) => slug === sl && lang === locale) ||
            data.allMdx.edges.find(({ node: { fields: { lang, slug } } }) => slug === sl && lang === defaultLocale);

        if (node)
            nodes.push(node);
    }

    return (
        <Layout>
            <main className={blogStyles.blog}>
                <h1>Materias</h1>
                <p>En esta pagina tengo información sobre las distintas materias que dicto.</p>
                {nodes.map((n) => {
                    return (
                        <article key={n.fields.slug}>
                            <Link to={`${n.fields.slug}`}>
                                <span className="univ">{n.frontmatter.univ}</span>
                                <h2>{n.frontmatter.title}</h2>
                                <time dateTime={moment.unix(n.frontmatter.date).format('YYYY-MM-DD')}>{
                                    moment.unix(n.frontmatter.date).format('MMMM D, YYYY')
                                }</time><br />
                                
                                <p>{n.frontmatter.description}</p>
                            </Link>
                        </article>
                    )
                })}
            </main>
        </Layout>
    )
}

export default CourcesPage