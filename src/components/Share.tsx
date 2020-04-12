import React from "react"
import { useClipboard } from "use-clipboard-copy"

import styled from "styled-components"
const url = "https://angry-archimedes-2061fb.netlify.com/?zip="
export default ({ location }) => {
  if (!location || !location.zip.length) {
    return <span />
  }
  const clipboard = useClipboard({ copiedTimeout: 750 })
  return (
    <div>
      <StyledInput ref={clipboard.target} value={`${url}${location.zip}`} readOnly />
      <StyledShareButton onClick={clipboard.copy}>
        {clipboard.copied ? "Copied!" : "Share"}
      </StyledShareButton>
    </div>
  )
}
const StyledInput = styled.input`
  display: none;
`

const StyledShareButton = styled.div`
  color: #e88a6b;
  border: none;

  &:hover {
    cursor: copy;
    color: grey;
  }
`
