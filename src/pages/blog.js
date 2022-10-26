import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { tagColors, colors } from "../resources/colors"

const Tag = ({ name }) => {
  let { primary, secondary } = tagColors[name] || colors.slice(-1)
  return (
    <div className="ctg" style={{"--color-cta-bg": primary, "--color-cta-text": secondary}}>
      <Link>{name}</Link>
      {/* <Link to={`/tags/${name}`}>{name}</Link> */}
    </div>
  )
}

const BlogHomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  let mdPosts = data.allMarkdownRemark.nodes

  // standardize format
  mdPosts = mdPosts.map(x => {
    return {
      url: x.fields.slug,
      title: x.frontmatter.title,
      date: x.frontmatter.date,
      description: x.frontmatter.description,
      tags: x.frontmatter.tags || []
    }
  })
  let posts = mdPosts.sort((a,b) => a.date > b.date ? 1 : -1)

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
                  <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '.7rem'}}>
                  {post.tags.map((x, i) => {return (
                    <Tag name={x} />
                  )})}
                  </div>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      {posts.length === 0 && <h1>Coming soon!</h1>}
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
          tags
        }
      }
    }
  }
`
