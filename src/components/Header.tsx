import React from "react"
import styled from "styled-components"

export default () => (
  <StlyedHeader>
    <StyledH1>Get covid stats and check out the curve for your county</StyledH1>
  </StlyedHeader>
)

const StlyedHeader = styled.header`
  padding-top: 50px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledH1 = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.text};
  margin: 0;
`
