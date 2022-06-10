import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <nav id="navbar">
        <h2>Sean Wade</h2>
        <ul>
          <li>
            <Link to="/">Projects</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/blog">About Me</Link>
          </li>
        </ul>
      </nav>
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
