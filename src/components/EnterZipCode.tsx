import React from "react"

export default ({ onChange, inputValue }) => (
  <>
    <label>Type in your Zip Code to get up to date stats:</label>
    <input style={{ color: "#333" }} value={inputValue} onChange={e => onChange(e)} />
  </>
)
