import React from "react"

export default ({ error }) => <>{error && error.message ? error.message : ""}</>
