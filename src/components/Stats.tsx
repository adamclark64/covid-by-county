import React from "react"
import styled from "styled-components"

import { UnderLine, Line } from "."
import { useStore } from "../data"

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export default () => {
  const { state } = useStore()
  const { lineData, stateData, showDataFor, location } = state
  const currentLineData = showDataFor === "nyt" ? lineData.nyt : lineData.jhu
  const currentStats = showDataFor === "nyt" ? location.nyt : location.jhu

  if (
    !currentLineData.length ||
    !stateData.stateCases ||
    !stateData.stateCases.length ||
    (!stateData.latestFirgures && stateData.latestFirgures.cases)
  ) {
    return <span />
  }
  const caseArr = currentLineData.find(d => d.id.search("Number of Cases") > -1).data
  const latestCases = caseArr[caseArr.length - 1]
  const casePercent =
    (parseInt(latestCases.y) / parseInt(stateData.latestFirgures.cases)) * 100 + 0.5

  const deathArr = currentLineData.find(d => d.id.search("Number of Deaths") > -1).data
  const latestDeaths = deathArr[deathArr.length - 1]
  const deathPercent =
    (parseInt(latestDeaths.y) / parseInt(stateData.latestFirgures.deaths)) * 100 + 0.5

  const stateDeaths = stateData.stateCases[stateData.stateCases.length - 1].deaths
  const stateCases = stateData.stateCases[stateData.stateCases.length - 1].cases

  return (
    <>
      <StyledStats>
        <StyledStatsSub>
          <p>
            <UnderLine str={currentStats.zip} /> is located in{" "}
            <UnderLine str={`${currentStats.city}, ${currentStats.state}`} /> , in{" "}
            <UnderLine str={currentStats.countyname} />
          </p>
        </StyledStatsSub>
        <StyledStatsMain>
          <p>
            <UnderLine str={`${formatNumber(latestCases.y)} Cases`} /> , or ~
            <UnderLine str={` ${Math.round(casePercent)}%`} /> of {currentStats.state}
            &apos;s cases, whose totals are <UnderLine str={formatNumber(stateCases)} /> cases
          </p>
          <p>
            <UnderLine str={`${formatNumber(latestDeaths.y)} Deaths`} /> , or ~
            <UnderLine str={` ${Math.round(deathPercent)}%`} /> of {currentStats.state}&apos;s
            deaths, whose totals are <UnderLine str={formatNumber(stateDeaths)} /> deaths
          </p>
        </StyledStatsMain>
      </StyledStats>
      {currentLineData && (
        <LineGraphContainer>
          <Line data={currentLineData} />
        </LineGraphContainer>
      )}
    </>
  )
}

const StyledStatsSub = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledStatsMain = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${props => props.theme.subtle};
  margin-left: 10px;
  padding-left: 10px;
  justify-content: center;
`

const StyledStats = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
`

const LineGraphContainer = styled.div`
  height: 500px;
  width: 1200px;
  @media (max-width: 1200px) {
    height: 500px;
    width: 1000px;
  }
  @media (max-width: 1000px) {
    height: 400px;
    width: 800px;
  }
  @media (max-width: 800px) {
    height: 300px;
    width: 650px;
  }
  @media (max-width: 600px) {
    height: 300px;
    width: 450px;
  }
  @media (max-width: 400px) {
    height: 300px;
    width: 300px;
  }
`
