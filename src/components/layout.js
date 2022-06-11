import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  return (
    <div className="app">
      <div className="outer-nav">
        <nav id="navbar">
          <Link to={'/'}> 
            <h2 className="logo">Sean Wade</h2>
          </Link>
          <ul>
            <li>
              <Link to="/">Work</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
