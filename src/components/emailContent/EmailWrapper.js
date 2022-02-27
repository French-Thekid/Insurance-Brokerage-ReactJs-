import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

function EmailWrapper({ children }) {
  const { Colours, mode } = useContext(ColourContext)

  return (
    <p
      css={`
        margin: 0;
        border-radius: 3px;
        display: inline;
        max-width: fit-content;
        height: max-content;
        background-color: ${mode === 'Dark'
          ? Colours.title
          : Colours.background};
        margin-right: 5px;
        padding: 5px 10px;
        font-size: 10px;
        color: ${Colours.text};
      `}
    >
      {children}
    </p>
  )
}
export default EmailWrapper
