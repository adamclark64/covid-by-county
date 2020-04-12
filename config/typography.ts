import Typography from "typography"

// This website uses the system font stack after the placed "Lora" font
// The scaleRatio will be overwritten for smaller breakpoints in src/components/Layout

const typography = Typography({
  title: "Covid By County",
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  headerFontFamily: ["Montserrat"],
  bodyFontFamily: ["Montserrat"],
  scaleRatio: 3.157,
  headerWeight: 700,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
})

export default typography
