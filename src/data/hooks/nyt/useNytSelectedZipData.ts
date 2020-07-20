import React from "react"
import moment from "moment"

import { CountyData } from "./nytTypes"
import {
  useStore,
  setGlobalLineData,
  setGlobalLocationData,
  setGlobalStateData,
  setGlobalError,
} from ".."

export const useNytSelectedZipData = () => {
  const { state, dispatch } = useStore()
  const { zip, location, fetchedData } = state
  const [localLocationData, setLocalLocationData] = React.useState(location)

  const getLineData = () => {
    if (!fetchedData.nyt.zips.length || !zip.length) {
      return dispatch(setGlobalError({ message: `no zip code data yet` }))
    }
    const loc = fetchedData.nyt.zips.find(x => x.zip.toString() === zip.toString())
    if (!loc) {
      return dispatch(
        setGlobalError({
          message: `no location found for ${zip}`,
        })
      )
    }
    if (
      [
        "New York",
        "Kings",
        "Queens",
        "Bronx",
        "Richmond",
        "New York City",
        "New York County",
      ].includes(loc.countyname)
    ) {
      loc.countyname = "New York City"
    }
    dispatch(setGlobalLocationData({ dataSource: "nyt", data: loc }))
    setLocalLocationData(loc)
    const countyCases: CountyData[] = fetchedData.nyt.countyCases.filter(x =>
      loc.countyname === "New York City"
        ? (x.fips === loc.stcountyfp && x.county.toLowerCase() === loc.countyname.toLowerCase()) ||
          x.county.toLowerCase() === loc.countyname.toLowerCase()
        : x.fips === loc.stcountyfp || x.county.toLowerCase() === loc.countyname.toLowerCase()
    )
    dispatch(setGlobalError({}))
    const lineData = [deathsData(countyCases), caseData(countyCases)]

    dispatch(setGlobalLineData({ dataSource: "nyt", data: lineData }))
  }

  const getStateData = () => {
    const stateCases = fetchedData.nyt.stateCases.filter(
      x =>
        localLocationData.stcountyfp &&
        x.fips.toString() === localLocationData.stcountyfp.substring(0, 2).toString()
    )
    const stateData = {
      latestFirgures: stateCases[stateCases.length - 1],
      stateCases,
    }
    dispatch(setGlobalStateData(stateData))
  }

  const setAllData = () => {
    if (zip.length === 5 && fetchedData.nyt.zips && fetchedData.nyt.zips.length) {
      getLineData()
      getStateData()
    }
  }

  React.useEffect(() => {
    if (zip.length === 5 && fetchedData.nyt.zips && fetchedData.nyt.zips.length) {
      getLineData()
    }
  }, [fetchedData.nyt.zips])

  React.useEffect(() => {
    setAllData()
  }, [zip])

  React.useEffect(() => {
    if (localLocationData.stcountyfp && fetchedData.nyt && fetchedData.nyt.stateCases)
      getStateData()
  }, [localLocationData, fetchedData.nyt.stateCases])
}

const format = "M/D"
const nyt = "nyt"
const deathsData = (arr: CountyData[]) => {
  const data = arr.map((point: any, i: any, arr: any) => {
    if (i === 0) {
      i = 1
    }
    const prev = arr[i - 1]
    return {
      x: moment(point.date).format(format),
      y: (point.deaths as any) - (prev.deaths as any),
    }
  })
  return {
    id: "Number of Deaths (nyt)",
    color: "#FFB996",
    data,
    nyt,
  }
}

const caseData = (arr: CountyData[]) => {
  const data = arr.map((point: any, i: any, arr: any) => {
    if (i === 0) {
      i = 1
    }
    const prev = arr[i - 1]
    return {
      x: moment(point.date).format(format),
      y: (point.cases as any) - (prev.cases as any),
    }
  })
  return {
    id: "Number of Cases (nyt)",
    color: "#57B3AC",
    data,
    nyt,
  }
}
