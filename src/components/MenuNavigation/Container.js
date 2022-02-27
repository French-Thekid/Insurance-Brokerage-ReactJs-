import React from 'react'
import 'styled-components/macro'

export default function Container({ children }) {
  return (
    <div
      css={`
        display: flex;
      `}
    >
      {children}
    </div>
  )
}
