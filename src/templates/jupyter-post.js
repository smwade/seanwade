import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotebookPostTemplate = ({ data, location }) => {
  const post = data.jupyter
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.metadata.title}
        description={post.metadata.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="jupyter"
        />
      </article>
    </Layout>
  )
}

export default NotebookPostTemplate

export const query = graphql`
  query JupyterBlogPostByName(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    jupyter(id: { eq: $id }) {
      id
      html
      name
      metadata {
        title
        description
      }
    }
    previous: jupyter(id: { eq: $previousPostId }) {
      url
      metadata {
        title
      }
    }
    next: jupyter(id: { eq: $nextPostId }) {
      url
      metadata {
        title
      }
    }
  }
`