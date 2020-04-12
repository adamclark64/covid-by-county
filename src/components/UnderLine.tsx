import React from "react"
import styled from "styled-components"

export default ({ str }) => <StyledUnderline>{str}</StyledUnderline>

const StyledUnderline = styled.span`
  border-bottom: ${props => `2.5px solid ${props.theme.underline}`}};
  cursor: default;
`
// border-bottom: ${props =>
//   props.theme.isDark
//     ? `5px solid ${props.theme.darkColor}`
//     : props.theme.lightColor};
