import React from "react"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/css/normalize.css"
// custom CSS styles
import "./src/css/typography.css"
import "./src/css/style.scss"

// Highlighting for code blocks
//import "prismjs/themes/prism.css"
import "prismjs/themes/prism-tomorrow.min.css"

import { ThemeProvider } from "./src/context/ThemeContext"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)