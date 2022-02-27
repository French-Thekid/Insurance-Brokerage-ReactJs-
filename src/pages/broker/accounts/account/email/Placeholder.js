import React from 'react'
import 'styled-components/macro'

import PlaceHolder from 'assets/PlaceHolder.png'
import { Core } from 'components'

export default function Placeholder() {
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content;
        grid-row-gap: 10px;
        justify-items: center;
      `}
    >
      <img
        css={`
          height: 200px;
          width: 310px;
          @media (max-width: 769px) {
            height: 180px;
            width: 250px;
          }
          @media (max-width: 376px) {
            height: 100px;
            width: 150px;
          }
        `}
        src={PlaceHolder}
        alt="Email Placeholder"
      />
      <Core.Text>Select an Item to read.</Core.Text>
    </div>
  )
}
