const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    console.log(node.internal.type)
    if (node.internal.type === 'Mdx') {
        let slug = path.basename(node.fileAbsolutePath, '.md')
        let type = 'static'
        if (/\/content\/blog\//.test(node.fileAbsolutePath)) {
            slug = `/blog/${slug}`;
            type = 'blog'
        }
        if (/\/content\/slides\//.test(node.fileAbsolutePath)) {
            slug = `/slides/${slug}`;
            type = 'slides'
        }
        if (/\/content\/courses\//.test(node.fileAbsolutePath)) {
            slug = `/courses/${slug}`;
            type = 'courses'
        }

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
        createNodeField({
            node,
            name: 'type',
            value: type
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const templates = {
        'blog': path.resolve('./src/templates/blog.js'),
        'courses': path.resolve('./src/templates/course.js'),
        'static': path.resolve('./src/templates/page.js'),
    }
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

    res.data.allMdx.edges.forEach((edge) => {
        if (edge.node.fields.type in templates)
            createPage({
                component: templates[edge.node.fields.type],
                path: `${edge.node.fields.slug}`,
                context: {
                    slug: edge.node.fields.slug
                }
            })
    })
}