import { LineData } from ".."

// CovidData
export const emptyCovidDataState: EmptyCovidDataState = {
  zips: [],
  countyCases: [],
  stateCases: [],
}

interface EmptyCovidDataState {
  zips: ZipData[]
  countyCases: CountyData[]
  stateCases: StateData[]
}

export interface ZipData {
  zip: string
  stcountyfp: string
  city: string
  state: string
  countyname: string
  classfp: string
}

export interface StateData {
  date: string
  state: string
  fips: string
  cases: string
  deaths: string
}

export interface CountyData {
  date: string
  county: string
  state: string
  fips: string
  cases: string
  deaths: string
}

// LineGraphData
export const emptyLineGraphData: LineGraphData = []
export type LineGraphData = LineData[]

// selectedZipData
export const emptyLocation: EmptyLocation = {
  stcountyfp: "",
  zip: "",
  countyname: "",
  city: "",
  state: "",
}

export interface EmptyLocation {
  stcountyfp: string
  zip: string
  countyname: string
  city: string
  state: string
}
