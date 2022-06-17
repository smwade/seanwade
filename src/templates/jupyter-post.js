import React, { Component } from 'react'
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


export default class NotebookPostTemplate extends Component {

  toggleDiv(x) {
      x.style.display = x.style.display === "none" ? "block" : "none";
    }

  toggleCode() {
      console.log('clicked!');
      let inputs = document.querySelectorAll('.cell > .input');
      inputs.forEach(this.toggleDiv);
      // let div = document.querySelector('.celltag_show > .jp-Cell-inputWrapper')
      // toggleDiv(div)
    }

  componentDidMount() {
    this.toggleCode()
  }

  render() {
    const { location, data } = this.props
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
          <button onClick={this.toggleCode.bind(this)} className="jupyter-code-toggle">Toggle Code</button>
        </article>
      </Layout>
    )
  }
}

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