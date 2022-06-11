import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

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

  const inside = (
      <>
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
        </>
        )
  
  return (
      <Window children={inside} />
  )
}

const Research = props => {
  return (
    <Window children={
      <>
      <p>{props.data.description}</p>
      <ul className="card-body-list">
        {props.data.publications.items.map((x, i) => (
          <Link to={x.url} className="body-link">
            <li className="research-link" key={i}>{x.name}</li>
          </Link>
        ))}
      </ul>
  </>
    }
    />
  )
}

const Window = ({ children }) => {
  return (
    <div className="window">
      <div className="window-bar">
        <div className="window-bar-button"></div>
        <div className="window-bar-middle">
          <hr/>
          <hr/>
          <hr/>
        </div>
        <div className="window-bar-button"></div>
      </div>
      <div className="window-inner">
          {children}
        </div>
    </div>
  )
}


const ComputerIcon = ({ name, image}) => {
  return (
    <div className="computer-icon">
      <GatsbyImage image={image} width={28} alt='copany logo' />
      <p>{name}</p>
    </div>
  )
}

const IndexPage = ({ data, location }) => {
  const siteTitle = 'Sean Wade'

  const skills = [
    ['Python', 'python'],
    ['Spark', 'spark'],
    ['Deep Learning', 'tensorflow'],
    ['ML', 'sklearn'],
    ['Stats', 'skill-r'],
    ['Big Data', 'hadoop'],
    ['Data Engineering', 'airflow'],
    ['Bayesian Inference', 'baysain'],
    ['SQL', 'sql'],
    ['Computer Vision', 'opencv'],
    ['Data Viz', 'matplotlib'],
    ['Jupyter', 'jupyter'],
    ['Linux', 'linux'],
    ['JS', 'js'],
    ['Web Dev', 'internet'],
  ]

  let iconSkills = []
  for (const x of skills) {
    const [name, refName] = x
    for (const x of data.skills.edges) {
      if (x.node.original.src.includes(refName)) {
        const imageData = x.node.gatsbyImageData
        const image = getImage(imageData)
        iconSkills.push(<ComputerIcon name={name} image={image}/>)
      }

    }
  }
  


  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Sean Wade"/>
      <h1>Hi, my name is Sean</h1>
      <p>
        I’m a data scientist working on improving peoples health and driving behavior change.
        I love asking interesting questions and using math to find impactful solutions.
        Most my days are made up wrangling, exploring, and modeling data in python.
        The tools I use range from deep learning to causal inference.

      </p>
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
      <div className="skill-section">
        {iconSkills}
      </div>
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
    skills: allImageSharp(filter: {original: {src: {regex: "/skill/"}}}) {
    edges {
      node {
        gatsbyImageData(width: 25)
        original {
          src
        }
      }
    }
  }
  }
`
