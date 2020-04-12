import fetch from "node-fetch"
import { ZipData, StateData, CountyData } from "./nytTypes"

export const getZips = async () => {
  return getCSV(
    "https://gist.githubusercontent.com/adamclark64/6e9b96acb25a81e07892cd21ef734e2a/raw/40b9e4617d51e8e51a370111d99e192898d2c350/zips.csv"
  )
}

export const getCases = async () => {
  return getCSV("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv")
}

export const getStateCases = async () => {
  return getCSV("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv")
}

const getCSV = async csvUrl => {
  const res = await fetch(csvUrl)
  const text = await res.text()
  return csvToJson(text)
}

const csvToJson = (csv: string) => {
  const rows = csv.split("\n")
  const keys = rows[0].split(",")

  // this stupid any need to be fixed
  const json: ZipData[] | StateData[] | CountyData[] | any = []

  for (let i = 1; i < rows.length; i++) {
    const items = rows[i].split(",")
    const row: ZipData | StateData | CountyData | object = {}
    for (let i = 0; i < keys.length; i++) {
      row[keys[i]] = items[i]
    }
    // if {} is all we have still, dont push it
    if (Object.keys(row).length === 0 && row.constructor === Object) {
      return
    }
    json.push(row)
  }

  return json
}
