
import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


const DotCard = (props) => {
  return (
    <div className="dot-card">
      <div className="dot-card-inside">
        {props.children}
      </div>
    </div>
  )
}

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Experimental" />
      <DotCard>
        <h1>This is a fancy card</h1>
        <p style={{flex: 3}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam vero mollitia quasi quis nostrum voluptates possimus porro ea, repellendus veniam, et omnis deserunt eaque eius natus tempore esse aperiam nesciunt!</p>
      </DotCard>
      <DotCard>
      </DotCard>
      <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
      <DotCard>
        <p>faskldjflaksdjfl</p>
      </DotCard>
      <DotCard />

      </div>
      <DotCard/>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

