import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogHomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  let mdPosts = data.allMarkdownRemark.nodes
  let jupyterPosts = data.allJupyter.edges

  // standardize format
  mdPosts = mdPosts.map(x => {
    return {
      url: x.fields.slug,
      title: x.frontmatter.title,
      date: x.frontmatter.date,
      description: x.frontmatter.description,
      tags: []
    }
  })
  jupyterPosts = jupyterPosts.map(x => {
    x = x.node
    return {
      url: `/${x.name}/`,
      title: x.metadata.title,
      date: x.metadata.date,
      description: x.metadata.description,
      tags: x.metadata.tags || []
    }
  })
  let posts = [...jupyterPosts, ...mdPosts].sort((a,b) => a.date > b.date ? 1 : -1)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="blog-page">
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li key={post.url}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.url} itemProp="url">
                      <span itemProp="headline">{post.title}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
              {/* <hr/> */}
            </li>
          )
        })}
      </ol>
</div>
    </Layout>
  )
}

export default BlogHomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
    allJupyter {
    edges {
      node {
        id
        html
        name
        metadata {
          title
          description
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
  }
`
