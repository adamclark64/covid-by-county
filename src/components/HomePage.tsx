import React from "react"
import { Result, Loader, ChooseDataSource, EnterZipCode } from "../components"
import styled from "styled-components"
import {
  useJhuCovidData,
  useNytCovidData,
  useJhuSelectedZipData,
  useNytSelectedZipData,
  useStore,
  setZip,
  setShowDataFor,
} from "../data"

export default ({ props }) => {
  const { state, dispatch } = useStore()
  const { fetchedData, fetchPending, zip } = state
  useJhuCovidData()
  useNytCovidData()
  useJhuSelectedZipData()
  useNytSelectedZipData()

  const [inputValue, setInputValue] = React.useState("")
  const urlParams = new URLSearchParams(props.location.search)
  const incomingValue = urlParams.get("zip")
  const covidData = fetchedData.nyt && fetchedData.jhu

  React.useEffect(() => {
    if (!!incomingValue && !zip.length) {
      setInputValue(incomingValue)
      dispatch(setZip(incomingValue))
    }
  }, [covidData])

  if (fetchPending || !covidData) {
    return <Loader />
  }

  const handleDataSourceSelect = e => dispatch(setShowDataFor(e.target.value))

  const handleZipCodeInputOnChange = e => {
    setInputValue(e.target.value)
    dispatch(setZip(e.target.value))
  }

  return (
    <>
      <StyledForm>
        <EnterZipCode inputValue={inputValue} onChange={e => handleZipCodeInputOnChange(e)} />
        <ChooseDataSource onChange={e => handleDataSourceSelect(e)} />
      </StyledForm>
      <Result />
    </>
  )
}

const StyledForm = styled.form`
  padding 10px;
  justify-content: center;
  align-items:center;
  margin-botttom:0;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  flex-direction: column;
`
