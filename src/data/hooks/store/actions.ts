export const SET_FETCHED_DATA = "SET_FETCHED_DATA"
export const SET_FETCH_PENDING = "SET_FETCH_PENDING"
export const SET_ZIP = "SET_ZIP"
export const SET_LINE_DATA = "SET_LINE_DATA"
export const SET_LOCATION_DATA = "SET_LOCATION_DATA"
export const SET_STATE_DATA = "SET_STATE_DATA"
export const SET_ERROR = "SET_ERROR"
export const SET_SHOW_DATA_FOR = "SET_SHOW_DATA_FOR"

export const setZip = payload => ({
  type: SET_ZIP,
  payload,
})

export const setGlobalLineData = payload => ({
  type: SET_LINE_DATA,
  payload,
})

export const setGlobalLocationData = payload => ({
  type: SET_LOCATION_DATA,
  payload,
})

export const setGlobalStateData = payload => ({
  type: SET_STATE_DATA,
  payload,
})

export const setShowDataFor = payload => ({
  type: SET_SHOW_DATA_FOR,
  payload,
})

export const setGlobalError = payload => ({
  type: SET_ERROR,
  payload,
})

export const setFetchedData = payload => ({
  type: SET_FETCHED_DATA,
  payload,
})

export const setFetchPending = payload => ({
  type: SET_FETCH_PENDING,
  payload,
})
