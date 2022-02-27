import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'

function Fieldset({ children, borderColour = Colours.border }) {
  let mode = localStorage.getItem('Theme') || ''

  return (
    <fieldset
      css={`
        border: 1px solid ${borderColour};
        border-radius: 5px;
        padding-top: 10px;
        box-shadow: ${mode === 'Dark'
          ? '0px 0px 2px 0px rgba(16,15,28,1)'
          : mode === 'Light' || mode === ''
          ? 'none'
          : 'none'};
        background: 'inherit';
      `}
    >
      {children}
    </fieldset>
  )
}
export default Fieldset
