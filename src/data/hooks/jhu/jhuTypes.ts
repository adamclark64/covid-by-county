import { LineData } from ".."

// CovidData
export const emptyCovidDataState: EmptyCovidDataState = {
  zips: [],
  fips: [],
  cases: [],
  deaths: [],
}

interface EmptyCovidDataState {
  zips: ZipData[] | []
  fips: EmptyLocation[] | []
  cases: CaseData[] | []
  deaths: DeathData[] | []
}

export interface ZipData {
  zip: string
  stcountyfp: string
}

export interface DeathData {
  [name: string]: string
}

export interface CaseData {
  [name: string]: string
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
  FIP: "",
  UID: "",
}

export interface EmptyLocation {
  stcountyfp: string
  zip: string
  countyname: string
  city: string
  state: string
  FIP: string
  UID: string
}

export interface StateData {
  date: string
  state: string
  fips: string
  cases: string
  deaths: string
}
