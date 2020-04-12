import fetch from "node-fetch"
import { ZipData, DeathData, CaseData } from "./jhuTypes"

export const getFips = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"
  )
  const text = await res.text()
  return csvToJson(text)
}

export const getZips = async () => {
  const res = await fetch(
    "https://gist.githubusercontent.com/adamclark64/6e9b96acb25a81e07892cd21ef734e2a/raw/40b9e4617d51e8e51a370111d99e192898d2c350/zips.csv"
  )
  const text = await res.text()
  return csvToJson(text)
}

export const getCases = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  )
  const text = await res.text()
  return csvToJson(text)
}

export const getDeaths = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
  )
  const text = await res.text()
  return csvToJson(text)
}

const splitComponentsByComma = (str: string) => {
  const ret: any[] = []
  const arr = str.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
  for (const i in arr) {
    let element: string = arr[i]
    if (element[0] === '"') {
      element = element.substr(1, element.length - 2)
    } else {
      element = arr[i].trim()
    }
    ret.push(element)
  }
  return ret
}

const csvToJson = (csv: string) => {
  const rows = csv.split("\n")
  const keys = rows[0].split(",")

  // const json: ZipData[] | StateData[] | CountyData[ | Object[] = []
  const json: any[] = []

  for (let i = 1; i < rows.length; i++) {
    const items = splitComponentsByComma(rows[i])
    // const items = rows[i].split(",")
    const row: ZipData | DeathData | CaseData | object = {}
    for (let i = 0; i < keys.length; i++) {
      const specialKey = "Combined_Key"
      if (keys[i] === specialKey) {
        row[keys[i]] = `${items[i]} ${items[i + 1]} ${items[i + 2]}`
      } else {
        row[keys[i]] = items[i]
      }
    }
    json.push(row)
  }

  return json
}
