import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import YAMLData from "../../content/resume/resume.yaml"

const Experience = ({ item, data }) => {
  const images = data.allImageSharp.edges
  let image
  for (const i of images) {
    if (i.node.original.src.includes(item.image)) {
      image = getImage(i.node.gatsbyImageData)
    }
  }
  const startDate =  new Date(item.dates.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short'})
  let endDate =  new Date(item.dates.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short'})

  endDate = item.dates.end ? endDate : 'Current' 
  
  return (
    <div className="resume-card experience">
      <div className="card-header">
        <div className="card-image">
          <GatsbyImage image={image} width={10} alt='copany logo' />
        </div>
        <div className="card-title">
          <div className="card-title-text">
            <h1>{item.name}</h1>
            <h2>{item.title}</h2>
          </div>
          <div className="card-title-date">
            <h3>{startDate} - {endDate}</h3>
          </div>
        </div>
      </div>
        <div className="card-body">
          <ul className="card-body-list">
            {item.description.map((x, i) => (
              <li>{x}</li>
            ))}
          </ul>
        </div>
    </div>
  )
}

const Research = props => {
  return (
    <div className="resume-card research">
      <p>{props.data.description}</p>
      <ul className="card-body-list">
        {props.data.publications.items.map((x, i) => (
          <Link to={x.url} className="body-link">
            <li className="research-link" key={i}>{x.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

const IndexPage = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteTitle = 'Sean Wade'
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Resume" />
      <h1>Hi, my name is Sean</h1>
      <div className="resume-section">
        <h2>Experience</h2>
        {YAMLData.experience.items.map(function (object, i) {
            return <Experience item={object} data={data} key={i} />
          })}
      </div>
      <div className="resume-section">
        <h2>Education</h2>
        {YAMLData.education.items.map(function (object, i) {
          return <Experience item={object} data={data} key={i} />
        })}
        </div>

      <div className="resume-section">
        <h2>Research</h2>
        <Research data={YAMLData.research} />
        </div>

      <h2>Skills</h2>
      <ul className="card-body-list">
      {YAMLData.skills.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allImageSharp(filter: {original: {src: {regex: "/logo/"}}}) {
    edges {
      node {
        gatsbyImageData(width: 60)
        original {
          src
        }
      }
    }
  }
  }
`
