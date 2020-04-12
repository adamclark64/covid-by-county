import React from "react"

import moment from "moment"
import { CaseData, DeathData, EmptyLocation, ZipData } from "./jhuTypes"
import { useStore, setGlobalError, setGlobalLineData, setGlobalLocationData } from ".."
import { light } from "../../../theme"

const daysBack = 70 // number of days of records (as of today, 69 is the max)

export const useJhuSelectedZipData = () => {
  const { state, dispatch } = useStore()
  const { zip, fetchedData } = state

  const getLineData = () => {
    dispatch(setGlobalError({}))
    if (!fetchedData.jhu.zips.length || !zip.length) {
      return dispatch(setGlobalError({ message: `no zip code data yet` }))
    }
    const z: ZipData =
      fetchedData.jhu.zips.find((x: ZipData) => {
        if (!x || !x.zip) {
          return
        }
        return x.zip.toString() === zip.toString()
      }) || (({} as unknown) as ZipData)
    if (!z) {
      return dispatch(setGlobalError({ message: `no zip code data found matching ${zip}` }))
    }
    const fip: EmptyLocation =
      fetchedData.jhu.fips.find(
        (x: EmptyLocation) => x && x.UID && x.UID.search(z.stcountyfp) > -1
      ) || (({} as unknown) as EmptyLocation)
    if (!fip) {
      return dispatch(
        setGlobalError({
          message: `no location found for ${zip}`,
        })
      )
    }
    const loc = {
      ...z,
      ...fip,
    }
    dispatch(setGlobalLocationData({ dataSource: "jhu", data: loc }))
    const cases: CaseData =
      fetchedData.jhu.cases.find((x: CaseData) => x && x.UID && x.UID === loc.UID) ||
      (({} as unknown) as CaseData)
    const deaths: DeathData =
      fetchedData.jhu.deaths.find((x: CaseData) => x.UID === loc.UID) ||
      (({} as unknown) as CaseData)
    if (!cases || !deaths) {
      return dispatch(
        setGlobalError({
          message: `problem finding data for ${zip}`,
        })
      )
    }
    dispatch(setGlobalLineData({ dataSource: "jhu", data: [deathsData(deaths), caseData(cases)] }))
  }

  const setAllData = () => {
    if (zip.length === 5 && fetchedData.jhu.zips && fetchedData.jhu.zips.length) {
      getLineData()
    }
  }
  React.useEffect(() => {
    if (zip.length === 5 && fetchedData.jhu.zips && fetchedData.jhu.zips.length) {
      getLineData()
    }
  }, [fetchedData.jhu.zips])

  React.useEffect(() => {
    setAllData()
  }, [zip])
}

const format = "M/D"
const jhu = "jhu"
const deathsData = (deathData: DeathData) => {
  const dataArr = Object.entries(deathData)
  const dataPoints = dataArr.slice(Math.max(dataArr.length - daysBack, 1))
  const data = dataPoints.map(i => {
    return {
      x: moment(i[0]).format(format),
      y: parseInt(i[1]),
    }
  })
  return {
    id: "Number of Deaths (jhu)",
    color: light.deaths,
    data,
    jhu,
  }
}

const caseData = (caseData: CaseData) => {
  const dataArr = Object.entries(caseData)
  const dataPoints = dataArr.slice(Math.max(dataArr.length - daysBack, 1))
  const data = dataPoints.map(i => {
    return {
      x: moment(i[0]).format(format),
      y: parseInt(i[1]),
    }
  })
  return {
    id: "Number of Cases (jhu)",
    color: light.cases,
    data,
    jhu,
  }
}
