const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const jupyterPost = path.resolve(`./src/templates/jupyter-post.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              date
            }
          }
        }
        allJupyter {
          edges {
            node {
              id
              name
              metadata {
                date
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  result.data.allJupyter.edges.forEach(edge => {
    const slug = edge.node.name
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/jupyter-post.js`),
      context: { id: edge.node.id },
    })
  })

  // get all types of posts 
  let mdPosts = result.data.allMarkdownRemark.nodes
  let jupyterPosts = result.data.allJupyter.edges

  // standardize format
  mdPosts = mdPosts.map(x => {
    return {
      url: x.fields.slug,
      id: x.id,
      date: x.frontmatter.date,
      postType: 'md'
    }
  })
  jupyterPosts = jupyterPosts.map(x => {
    x = x.node
    return {
      url: `/${x.name}/`,
      id: x.id,
      date: x.metadata.date,
      postType: 'jupyter'
    }
  })
  const posts = [...mdPosts, ...jupyterPosts].sort((a,b) => a.date < b.date)

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.url,
        component: (post.postType === 'md') ? blogPost : jupyterPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `Jupyter`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
