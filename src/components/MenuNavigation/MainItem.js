import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

export default function MainItem({ handler, active, children }) {
  const { Colours, mode } = useContext(ColourContext)

  return (
    <div
      css={`
        width: max-content;
        padding: 5px 20px;
        border-bottom: ${active ? `2px solid ${Colours.blue}` : 'none'};
        color: ${active
          ? Colours.blue
          : mode === 'Dark'
          ? '#fff'
          : Colours.textGrey};
        font-size: 18px;
        transition: ease-out 0.1s;
        &:hover {
          cursor: pointer;
          color: ${Colours.blue};
          transition: ease-out 0.1s;
          transform: ${active ? 'none' : 'translateY(-1px)'};
        }
      `}
      onClick={() => handler(children)}
    >
      {children}
    </div>
  )
}
