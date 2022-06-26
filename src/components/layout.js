import * as React from "react"
import { Link } from "gatsby"

const toggleDarkMode = () => {
  console.log('clicked');
  const app = document.querySelector(".app")
  app.classList.toggle("dark")
}

const Layout = ({ location, title, children }) => {
  return (
    <div className="app">
      {/* <p class="forhire">Available for <a href="mailto:sean@pulshealth.com">freelance &amp; speaking</a> opportunities</p> */}
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
            <li>
              <button onClick={toggleDarkMode}>Mode</button>
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
