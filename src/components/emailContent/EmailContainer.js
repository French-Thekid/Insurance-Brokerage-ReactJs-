import React, { useContext } from 'react'
import 'styled-components/macro'

import { Core, Icons } from 'components'
import { useHistory } from 'react-router-dom'
import { ColourContext } from 'context'

export default function ({ children, title = 'New Mail' }) {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        height: 100%;
        width: 100%;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr max-content;
          justify-items: space-between;
          background: ${Colours.menuHover};
          border-bottom: 1px solid ${Colours.border};
          width: calc(100% - 20px);
          height: max-content;
          padding: 5px 10px;
          z-index: 2;
          align-items: center;
        `}
      >
        <Core.Text weight="600">{title}</Core.Text>
        <section
          css={`
            color: ${Colours.inactive};
            transition: ease-out 0.2s;
            &:hover {
              color: ${Colours.red};
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateY(-2px);
            }
          `}
        >
          <Icons.ClearRounded
            color="inherit"
            onClick={() => history.goBack()}
          />
        </section>
      </div>
      <div
        css={`
          padding: 10px;
          height: calc(100% - 20px);
          overflow-y: auto;
        `}
      >
        {children}
      </div>
    </div>
  )
}
