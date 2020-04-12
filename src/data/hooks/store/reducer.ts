import {
  SET_FETCHED_DATA,
  SET_FETCH_PENDING,
  SET_ZIP,
  SET_LINE_DATA,
  SET_LOCATION_DATA,
  SET_STATE_DATA,
  SET_ERROR,
  SET_SHOW_DATA_FOR,
} from "./actions"

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_FETCHED_DATA:
      return {
        ...state,
        fetchedData: {
          ...state.fetchedData,
          [action.payload.dataSource]: action.payload.data,
        },
      }
    case SET_FETCH_PENDING:
      return {
        ...state,
        fetchPending: action.payload,
      }
    case SET_ZIP:
      return {
        ...state,
        zip: action.payload,
      }
    case SET_LINE_DATA:
      return {
        ...state,
        lineData: {
          ...state.lineData,
          [action.payload.dataSource]: action.payload.data,
        },
      }
    case SET_LOCATION_DATA:
      return {
        ...state,
        location: {
          ...state.location,
          [action.payload.dataSource]: action.payload.data,
        },
      }
    case SET_STATE_DATA:
      return {
        ...state,
        stateData: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_SHOW_DATA_FOR:
      return {
        ...state,
        showDataFor: action.payload,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
