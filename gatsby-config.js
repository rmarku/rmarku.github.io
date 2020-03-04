module.exports = {
    siteMetadata: {
        title: 'Entre transistores y bytes',
        author: 'Marcucci Ricardo Martín'
    },
    plugins: [
        {
            resolve: 'gatsby-theme-mdx-deck',
            options: {
                mdx: true,
                contentPath: 'content/slides',
                basePath: '/slides',
            },
        }, {
            resolve: 'gatsby-plugin-compile-es6-packages',
            options: {
                modules: ['mdx-deck', 'gatsby-theme-mdx-deck', '@mdx-deck/themes'],
            },
        },
        'gatsby-plugin-sass',
        // ******          Blog Content
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/blog`,
                name: 'blog',
            }
        },
        // ******          Static pages Content
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/pages`,
                name: 'pages',
            }
        },
        // ******          Static pages courses
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/courses`,
                name: 'courses',
            }
        },
        'gatsby-plugin-sharp',
        `gatsby-plugin-feed-mdx`,
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    },
                    `gatsby-remark-prismjs`,
                ]
            }
        },

        /******** Datos para el curriculum */
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/data`,
                name: 'data',
            },
        },

        // Misc. assets
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/assets`,
                name: 'assets',
            },
        },
    ]
}
