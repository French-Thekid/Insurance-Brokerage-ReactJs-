import React, { useContext } from 'react'
import 'styled-components/macro'
import { Core } from 'components'
import { ColourContext } from 'context'

function TemplateSidebar({ children }) {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        border-left: 2px solid ${Colours.border};
        border-right: 2px solid ${Colours.border};
        height: 100%;
        width: 250px;
        display: grid;
        grid-template-rows: max-content 1fr;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      `}
    >
      <div
        css={`
          width: calc(100% - 20px);
          background: ${Colours.title};
          border-bottom: 1px solid ${Colours.border};
          padding: 10px;
          display: grid;
          justify-items: center;
        `}
      >
        <Core.Text weight="700">Draggable Components</Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(4, 50px);
          grid-row-gap: 10px;
          width: calc(100% - 20px);
          padding: 10px;
          border-top: 1px solid ${Colours.border};
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default TemplateSidebar
