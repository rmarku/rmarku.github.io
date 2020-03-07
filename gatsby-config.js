const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
console.log(`Usando configuración: "${activeEnv}"`);
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const siteMetadata = require("./src/siteMetadata")

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: "gatsby-theme-mdx-deck",
      options: {
        mdx: true,
        contentPath: "content/slides",
        basePath: "/slides",
      },
    },
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["mdx-deck", "gatsby-theme-mdx-deck", "@mdx-deck/themes"],
      },
    },
    "gatsby-plugin-sass",
    // ******          Blog Content
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    // ******          Static pages Content
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/pages`,
        name: "pages",
      },
    },
    // ******          Static pages courses
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/courses`,
        name: "courses",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          //`gatsby-remark-autolink-headers`,
          "gatsby-remark-attr",
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              loading: "lazy",
            },
          },
          {
            resolve: "gatsby-remark-github",
            options: {
              marker: "GITHUB-EMBED",
              insertEllipsisComments: true,
              ellipsisPhrase: "...",
              useCache: true,
              cacheKey: "gatsby-remark-github-v1",
              token:process.env.GITHUB_TOKEN,
            },
          },
          `gatsby-remark-prismjs`,
          "gatsby-remark-copy-linked-files",
        ],
      },
    },

    /******** Datos para el curriculum */
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data`,
        name: "data",
      },
    },

    // Misc. assets
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `es`],
        // language file path
        defaultLanguage: `es`,
        // option to redirect to `/es` when connecting `/`
        redirect: false,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.ANALYTICS_UA,
      },
    },
  ],
}
