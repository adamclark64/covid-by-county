import React from "react"
import { reducer, StoreContext, initialState } from "../data"

export default ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}
