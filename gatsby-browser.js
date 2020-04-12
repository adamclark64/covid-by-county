/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`This application has been updated. ` + `Reload to display the latest version?`)
  if (answer === true) {
    window.location.reload()
  }
}

export const registerServiceWorker = () => true
