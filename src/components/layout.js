import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

const toggleDarkMode = () => {
  console.log('clicked');
  const app = document.querySelector(".app")
  app.classList.toggle("dark")
}

const enableDarkMode = () => {
  const app = document.querySelector(".app")
  app.classList.add("dark")
  localStorage.setItem("colorMode", "dark")
}

const disableDarkMode = () => {
  const app = document.querySelector(".app")
  app.classList.remove("dark")
  localStorage.setItem("colorMode", "light")
}



const Layout = ({ location, title, children }) => {

  useEffect(() => {
    localStorage.getItem("colorMode") === "dark" ? enableDarkMode() : disableDarkMode()
  }, [])
  
  const [colorMode, setColorMode] = useState(localStorage.getItem("colorMode"))

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
    if (colorMode === "light") {
      enableDarkMode()
    }
    else if (colorMode === "dark") {
      disableDarkMode()
    }
  }
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
            <li style={{display: 'flex'}}>
              {colorMode === "light" ?  <BsFillMoonFill onClick={toggleColorMode} /> : <BsFillSunFill onClick={toggleColorMode} />}
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
