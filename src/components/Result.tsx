import React from "react"
import styled from "styled-components"

import { useStore } from "../data/"
import { Share, Error, Stats } from "."

export default () => {
  const { state } = useStore()
  const { lineData, error, showDataFor, location } = state
  if (!lineData.jhu.length || !lineData.nyt.length) {
    return <span />
  }
  if (error.message) {
    return <Error error={error} />
  }
  const currentLocationData = showDataFor === "nyt" ? location.nyt : location.jhu
  return (
    <>
      {currentLocationData && !error.message && !!currentLocationData.zip && (
        <>
          <StyledContainer>
            <Stats />
          </StyledContainer>
          <Share location={currentLocationData} />
        </>
      )}
    </>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 10px;
  margin: 0 0 40px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 6px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 25px;
`
