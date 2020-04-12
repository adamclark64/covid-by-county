import React from "react"

const initialContext: Context = {
  state: {},
  dispatch: () => {},
}

interface Context {
  state: Record<string, any>
  dispatch: Function
}

export const StoreContext = React.createContext(initialContext)

export const useStore = () => React.useContext(StoreContext)
