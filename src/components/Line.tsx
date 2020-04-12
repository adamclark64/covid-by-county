import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { ThemeManagerContext } from "gatsby-styled-components-dark-mode"

import { light, dark } from "../theme"
import { LineGraphData } from "../data/hooks/nyt/nytTypes"

interface Props {
  data: LineGraphData
}

export default ({ data }: Props) => {
  const themeContext = React.useContext(ThemeManagerContext)

  const theme = {
    textColor: `${themeContext.isDark ? dark.text : light.text}`,
    legend: {
      text: {
        fill: `${themeContext.isDark ? dark.text : light.text}`,
      },
    },
    tooltip: {
      container: {
        background: `${themeContext.isDark ? dark.bg : light.bg}`,
      },
    },
  }
  return (
    <ResponsiveLine
      theme={theme}
      data={data}
      margin={{ top: 50, right: 20, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      enablePointLabel
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Count",
        legendOffset: -55,
        legendPosition: "middle",
      }}
      colors={d => d.color}
      pointSize={3}
      pointColor={d => d.color}
      pointBorderWidth={2}
      pointBorderColor={d => d.color}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableArea={true}
      areaBlendMode="normal"
      areaOpacity={0.2}
      useMesh={true}
      animate={true}
      motionStiffness={300}
      motionDamping={20}
      legends={[
        {
          anchor: "top",
          itemTextColor: `${themeContext.isDark ? dark.text : light.text}`,
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -50,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 200,
          fontSize: 20,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 20,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}
