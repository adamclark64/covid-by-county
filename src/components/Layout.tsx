import React from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { ThemeManagerContext } from "gatsby-styled-components-dark-mode"
import Helmet from "react-helmet"

import { Header, Footer, StoreProvider } from "."

interface LayoutProps {
  readonly children?: React.ReactNode | readonly React.ReactNode[]
}

export default ({ children }: LayoutProps) => {
  const themeContext = React.useContext(ThemeManagerContext)

  const ToggleTheme = () => (
    <StyledToggle onClick={() => themeContext.toggleDark()}>
      <StyledFontAwesomeIcon
        color={props => props.theme.subtle}
        icon={themeContext.isDark ? faSun : faMoon}
      />
    </StyledToggle>
  )

  return (
    <>
      <Helmet title="Covid By County 🦠" defer={false} />
      <StyledWrapper>
        <ToggleTheme />
        <Header />
        <StyledContainer>
          <StoreProvider>
            <StyledMain>{children}</StyledMain>
          </StoreProvider>
        </StyledContainer>
      </StyledWrapper>
      <Footer />
    </>
  )
}

const StyledWrapper = styled.div`
  height: 100vh;
  background: ${props => props.theme.bg} !important;
  > * {
    font-family: "Montserrat";
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg} !important;
  }
`

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 10px;
  padding-top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledMain = styled.main`
  display: contents;
`

const StyledToggle = styled.span`
  margin-left: 10px;
  cursor: pointer;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  overflow: hidden;
  position: absolute;
  right: 10px;
  top: 10px;
`

const fadeInOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: relative;
  animation-name: ${props => (props.theme.isDark ? fadeInOpacity : fadeInOpacity)};
  animation-duration: 0.25s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  fill: #5a5a5a;
  height: 20px;
  width: 20px;
  filter: ${props => (props.theme.isDark ? "brightness(80%)" : "brightness(100%)")};
  &:hover {
    filter: ${props => (props.theme.isDark ? "brightness(100%)" : "brightness(80%)")};
  }
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
`
