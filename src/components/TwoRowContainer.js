import React from 'react'
import 'styled-components/macro'

export default function TwoRowContainer({ children }) {
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content;
        height: max-content;
        grid-row-gap: 5px;
      `}
    >
      {children}
    </div>
  )
}
