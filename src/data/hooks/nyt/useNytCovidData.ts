import React from "react"
import { getZips, getCases, getStateCases } from "./nytFetchData"
import { useStore, setGlobalError, setFetchPending, setFetchedData } from ".."

export const useNytCovidData = () => {
  const { dispatch } = useStore()

  const execute = React.useCallback(() => {
    dispatch(setFetchPending(true))
    setGlobalError({})
    return Promise.all([getZips(), getCases(), getStateCases()])
      .then(response => {
        dispatch(
          setFetchedData({
            dataSource: "nyt",
            data: {
              zips: response[0],
              countyCases: response[1],
              stateCases: response[2],
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
