export const initialState = {
  zip: "",
  lineData: {
    nyt: [],
    jhu: [],
  },
  location: {
    nyt: {},
    jhu: {},
  },
  stateData: {},
  error: {
    message: "",
  },
  loading: false,
  showDataFor: "nyt",
  fetchedData: {
    nyt: {},
    jhu: {},
  },
  fetchPending: false,
}
