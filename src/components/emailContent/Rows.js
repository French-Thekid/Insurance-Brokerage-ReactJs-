import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

export default function Row({ children }) {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr 50px 20px;
        height: 60px;
        border-bottom: 1px solid ${Colours.border};
        padding-right: 10px;
        align-items: center;
        grid-column-gap: 5px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          background: ${Colours.menuHover};
        }
      `}
    >
      {children}
    </div>
  )
}
