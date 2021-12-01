import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import YAMLData from "../../content/resume/resume.yaml"
import { StaticImage } from "gatsby-plugin-image"



const Experience = (props) => {
	return (
		<div className='resume-section experience'>
			<div className="resume-section-column">
				<StaticImage src="../images/logo-apple.jpeg" alt="Apple logo" />
			</div>
			<div className="resume-section-column">
				<h1>{props.item.name}</h1>
				<h2>{props.item.title}</h2>
			</div>
			<div className="resume-section-column">
				<ul>
					{props.item.description.map((x, i) => <li>{x}</li>)}
				</ul>
			</div>
		</div>
	)
}

const Education = (props) => {
	return (
		<div className='resume-section education'>
			<h1>{props.item.name}</h1>
			<h2>{props.item.location}</h2>
		</div>
	)
}

const Research = (props) => {
	return (
		<div className='resume-section research'>
			<p>{props.data.description}</p>
			<ul>
				{props.data.publications.map((x, i) => <li key={i}>{x}</li>)}
			</ul>
		</div>
	)
}

const Card = () => (
	<div className="card" style={{width: '18rem'}}>
		<div className="card-body">
			<h5 className="card-title">Card title</h5>
			<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<a href="#" className="btn btn-primary">Go somewhere</a>
		</div>
	</div>
)


const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Resume" />
			<h2>Profesional Experience</h2>
			{YAMLData.experience.items.map(function(object, i){
					return <Experience item={object} key={i} />;
			})}

			<h2>Education</h2>
			{YAMLData.education.items.map(function(object, i){
					return <Education item={object} key={i} />;
			})}

			<h3>Research</h3>
			<Research data={YAMLData.research} />

			<h2>Skills</h2>
			{YAMLData.skills.map((x, i) => <li key={i}>{x}</li>)}

			<h2>Side Projects</h2>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
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
  }
`
