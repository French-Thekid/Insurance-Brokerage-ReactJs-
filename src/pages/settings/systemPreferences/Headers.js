import React from 'react'
import { Colours } from 'components'
import 'styled-components/macro'

const HeaderButton = (props) => {
  const { children, active } = props
  return (
    <button
      {...props}
      type="button"
      css={`
        height: 40px;
        padding: 15px;
        outline: none;
        border: none;
        border-bottom: ${active ? `2px solid ${Colours.blue}` : 'none'};
        background-color: inherit;
        color: ${active ? Colours.blue : '#707070'};
        font-size: .9em;
        font-weight: 500;
        &:hover {
          cursor: pointer;
          color: ${Colours.blue};
        }
      `}
    >
      {children}
    </button>
  )
}

function Headers({ setActive, active }) {
  return (
    <div
      css={`
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(3, max-content);
        border-bottom: 2px solid white;
      `}
    >
      <HeaderButton
        active={active === 'PREFERENCES'}
        onClick={() => setActive('PREFERENCES')}
      >
        Preferences
      </HeaderButton>
      {/* <HeaderButton
        active={active === 'WIDGETS'}
        onClick={() => setActive('WIDGETS')}
      >
        Widgets
      </HeaderButton> */}
    </div>
  )
}
export default Headers
