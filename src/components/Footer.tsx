import React from "react"
import styled from "styled-components"

export default () => <StyledFooter>© {new Date().getFullYear()}, Built with ❤️</StyledFooter>

const StyledFooter = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  display: flex;
  justify-content: center;
  padding: 10px;
`
