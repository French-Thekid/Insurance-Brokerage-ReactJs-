import React, { useContext } from 'react'
import 'styled-components/macro'
import PolicyDetails from './PolicyDetails'
import { Core } from 'components'
import { ColourContext } from 'context'
import { useLocation } from 'react-router-dom'
import History from '../history'

const queryString = require('query-string')

export default function Index() {
  const { memo } = JSON.parse(localStorage.getItem('activePolicy')) || {}
  const { Colours } = useContext(ColourContext)
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  return (
    <>
      <div
        css={`
          display: grid;
          height: 100%;
          grid-template-rows: 2fr 1fr;
          grid-gap: 10px;
        `}
      >
        <PolicyDetails />
        <div
          css={`
            width: 100%;
            border-radius: 5px;
          `}
        >
          <div
            css={`
              height: calc(100% - 2px);
              display: grid;
              grid-template-rows: max-content 1fr;
              border-radius: 5px;
              border: 1px solid ${Colours.border};
            `}
          >
            <div
              css={`
                background: ${Colours.title};
                border-bottom: 0.5px solid ${Colours.border};
                display: grid;
                align-items: center;
                padding: 10px;
              `}
            >
              <Core.Text weight="500">Memo</Core.Text>
            </div>
            <div
              css={`
                padding: 10px;
                height: calc(100% - 20px);
                overflow-y: auto;
              `}
            >
              <Core.Text>{memo}</Core.Text>
            </div>
          </div>
        </div>
      </div>
      {action === 'viewHistory' && (
        <History isShowing={action === 'viewHistory'} />
      )}
    </>
  )
}
