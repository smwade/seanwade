import * as React from "react"
import { useContext } from "react"
import { Link } from "gatsby"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

import ThemeContext from "../context/ThemeContext"


const Layout = ({ location, title, children }) => {

  let { colorScheme, setColorScheme } = useContext(ThemeContext)

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
            <li style={{display: 'flex'}}>
              {colorScheme === "light" ?  <BsFillMoonFill onClick={() => setColorScheme('dark')} /> : <BsFillSunFill onClick={() => setColorScheme('light')} />}
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
