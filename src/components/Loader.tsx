import React from "react"
// @ts-ignore ...Cannot find module '../images/loader.gif'.ts(2307)
// but if works ¯\_(ツ)_/¯
import loaderUrl from "../images/loader.gif"

export default () => (
  <>
    <img style={style} src={loaderUrl} />
  </>
)

const squaredDimesion = "50px"
const style = {
  height: squaredDimesion,
  width: squaredDimesion,
}
