import React from "react"

const defaultState = {
  colorScheme: 'light',
  setColorScheme: () => {},
}

const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends React.Component {
  state = {
    colorScheme: null,
  }

  setColorScheme = (colorScheme) => {
    document.body.classList = []
    document.body.classList.add(colorScheme)
    localStorage.setItem("colorScheme", colorScheme)
    this.setState({ colorScheme })
  }

  componentDidMount() {
    const colorScheme = localStorage.getItem("colorScheme")
    this.setState({ colorScheme: colorScheme})
  }

  render() {
    const { children } = this.props
    const { colorScheme } = this.state
    return (
      <ThemeContext.Provider
        value={{
          colorScheme,
          setColorScheme: this.setColorScheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }