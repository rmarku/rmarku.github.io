const path = require("path")

module.exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === "Mdx") {
    let slug = path.basename(node.fileAbsolutePath, ".md")
    if (slug.includes("mdx")) {
      slug = slug.substr(0, slug.length - 4)
    }
    let type = "static"
    if (/\/content\/blog\//.test(node.fileAbsolutePath)) {
      slug = `/blog/${slug}`
      type = "blog"
    }
    if (/\/content\/slides\//.test(node.fileAbsolutePath)) {
      slug = `/slides/${slug}`
      type = "slides"
    }
    if (/\/content\/courses\//.test(node.fileAbsolutePath)) {
      slug = `/courses/${slug}`
      type = "courses"
    }

    let lang = "es"
    const matches = slug.match(/\.([a-z]*)$/)
    if (matches && matches.length === 2) {
      lang = matches[1]
      slug = slug.substr(0, slug.length - lang.length - 1)
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
    createNodeField({
      name: "lang",
      node,
      value: lang,
    })
    createNodeField({
      node,
      name: "type",
      value: type,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const templates = {
    blog: path.resolve("./src/templates/blog.js"),
    courses: path.resolve("./src/templates/course.js"),
    static: path.resolve("./src/templates/page.js"),
  }

  // Construyo las paginas del blog
  const res = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `)

  res.data.allMdx.edges.forEach(edge => {
    if (edge.node.fields.type in templates)
      createPage({
        component: templates[edge.node.fields.type],
        path: `${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
        },
      })
  })
}
