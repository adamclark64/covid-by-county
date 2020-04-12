import React from "react"
import { Radio } from "antd"
import "antd/dist/antd.css"
// import { useStaticQuery, graphql } from "gatsby"
import { dataSourceOpts } from "../data"

interface Props {
  onChange: Function
}

export default ({ onChange }: Props) => {
  // const data = useStaticQuery(graphql`
  //   query MyQuery {
  //     githubData {
  //       repository {
  //         ref {
  //           target {
  //             history {
  //               edges {
  //                 node {
  //                   committedDate
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  // console.log("%c data", "color:tomato;font-size:20px;", data)
  return (
    <>
      <label>Select a data source:</label>
      <Radio.Group buttonStyle="solid" onChange={e => onChange(e)} defaultValue="nyt">
        {dataSourceOpts.map(opt => (
          <Radio.Button key={opt.id} value={opt.id}>
            {opt.display}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  )
}
