/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: `covid-19 curve data, updated daily`,
    description: `covid-19 curve data, updated daily from NY times and Johns Hopkins University github data sets`,
    author: `@adamclark64`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: "d20f4c601fb9cab910da20b1a2693234a3a2bf2b",
        variables: {},
        graphQLQuery: `
          query {
            repository(owner: "CSSEGISandData", name: "COVID-19") {
              object(expression: "master") {
                ... on Commit {
                  history(path: "csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv", first:1) {
                    edges {
                      node {
                        commitUrl
                        committedDate
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#183C52",
          "@border-color-base": "#183C52",
          "@heading-color": "#183C52",
        },
      },
    },
    {
      resolve: `gatsby-styled-components-dark-mode`,
      options: {
        light: require(`${__dirname}/src/theme/light.ts`).light,
        dark: require(`${__dirname}/src/theme/dark.ts`).dark,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat`,
          "Roboto",
          "Lato",
          // `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "config/typography.ts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Covid By County`,
        title: `Covid By County`,
        short_name: `Covid By County`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        description: `Covid curve by county`,
        display: `minimal-ui`,
        icon: `src/images/loader.gif`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve("./src/service-worker.js"),
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-162524109-1",
      },
    },
  ],
}
