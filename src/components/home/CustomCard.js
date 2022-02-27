import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Core } from 'components'

export default function CustomCard({
  minHeight = 'auto',
  maxHeight,
  marginTop = '0px',
  title = 'New Card',
  children,
  Task,
  right,
}) {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        min-height: ${minHeight};
        max-height: ${maxHeight || 'auto'};
        @media (max-height: 676px) {
          min-height: ${Task ? '450px' : minHeight};
          max-height: ${Task ? '495px' : maxHeight || 'auto'};
        }
        @media (min-height: 1215px) {
          max-height: 100%;
        }
        margin-top: ${marginTop};
        height: calc(100% - 2px);
        width: ${right ? `calc(100% - 10px)` : `calc(100% - 2px)`};
        display: grid;
        grid-template-rows: 40px 1fr;
        border: 1px solid ${Colours.border};
        border-radius: 5px;
        box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.04);
        background: ${Colours.foreground};
        transition: ease-out 1s;
      `}
    >
      <div
        css={`
          background: ${Colours.menuHover};
          border-bottom: 1px solid ${Colours.border};
          display: grid;
          align-items: center;
          padding: 0px 10px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          transition: ease-out 1s;
        `}
      >
        <Core.Text weight="600">{title}</Core.Text>
      </div>
      <div
        css={`
          overflow-y: auto;
          padding: 10px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          background: ${Colours.bg1};
          transition: ease-out 1s;
        `}
      >
        {children}
      </div>
    </div>
  )
}
