import React, { useEffect, useContext, useRef } from 'react'
import { SlipContext } from '../../context'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Core } from 'components'

export default function ({ data = [], extensionList, policyId }) {
  const { setExtensionsPair } = useContext(SlipContext)
  const listRef = useRef(extensionList)
  const { Colours, mode } = useContext(ColourContext)

  useEffect(() => {
    setExtensionsPair((state) => {
      const extensions = state.extensions.concat({
        policyId: parseInt(policyId),
        extensions: listRef.current,
      })
      return {
        extensions,
      }
    })
  }, [listRef, setExtensionsPair, policyId]) // Only run this once to populate motorRiskIdsPolicyPairs initially

  return (
    <>
      <div
        css={`
          height: max-content;
          background-color: ${Colours.header};
          border: 0.5px solid ${Colours.border};
          padding: 5px;
          margin-top: 10px;
          border-radius: 2px;
        `}
      >
        <Core.Text customSize="12px" weight="600">
          Extensions
        </Core.Text>
      </div>
      <div
        css={`
          width: 100%;
          margin-bottom: 25px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 2fr;
            align-items: center;
            justify-items: start;
            margin-bottom: 5px;
            padding: 5px;
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Name
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Limit
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Type
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Description
          </Core.Text>
        </div>
        {data.map(({ name, limit, type, description }, index) => (
          <div
            key={index}
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 2fr;
              align-items: start;
              justify-items: start;
              padding: 5px;
              border-bottom: 0.5px solid ${Colours.border};
              &:nth-child(even) {
                background-color: ${Colours.hover};
              }
            `}
          >
            <Core.Text customSize="12px">{name || '--'}</Core.Text>
            <Core.Text customSize="12px">${limit || '--'}</Core.Text>
            <Core.Text customSize="12px">{type || '--'}</Core.Text>
            <Core.Text customSize="12px">{description || '--'}</Core.Text>
          </div>
        ))}
      </div>
    </>
  )
}
