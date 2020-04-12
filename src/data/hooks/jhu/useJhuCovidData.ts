import React from "react"
import { getZips, getCases, getDeaths, getFips } from "./jhuFetchData"
import { useStore, setGlobalError, setFetchPending, setFetchedData } from ".."

export const useJhuCovidData = () => {
  const { dispatch } = useStore()

  const execute = React.useCallback(() => {
    dispatch(setFetchPending(true))
    dispatch(setGlobalError({}))
    return Promise.all([getZips(), getFips(), getCases(), getDeaths()])
      .then(response => {
        dispatch(
          setFetchedData({
            dataSource: "jhu",
            data: {
              zips: response[0],
              fips: response[1],
              cases: response[2],
              deaths: response[3],
            },
          })
        )
      })
      .catch(error => dispatch(setGlobalError(error)))
      .finally(() => dispatch(setFetchPending(false)))
  }, [])

  React.useEffect(() => {
    execute()
  }, [])
}
