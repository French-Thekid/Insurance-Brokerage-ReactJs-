import React, { useContext } from 'react'
import 'styled-components/macro'
import { NavLink } from 'react-router-dom'

import { ColourContext } from 'context'

const NavItem = ({ children, left, active, ...props }) => {
  const { Colours } = useContext(ColourContext)

  return (
    <NavLink
      css={`
        color: ${active ? Colours.blue : Colours.text};
        font-weight: 600;
        font-size: 0.8em;
        background: ${active ? 'rgba(2,96,178,0.09)' : `none`};
        border: none;
        border-bottom: ${active ? `3px solid ${Colours.blue}` : `none`};
        border-top-left-radius: ${left ? '5px' : '0px'};
        margin-left: 0px;
        transition: all 300ms linear 0s;
        text-decoration: none;
        cursor: pointer;
        padding: 10px 15px 10px 15px;
        outline: none;
        &:hover {
          outline: none;
          color: ${Colours.blue};
        }
        @media (max-width: 768px) {
          display: none;
        }
      `}
      {...props}
    >
      {children}
    </NavLink>
  )
}
export default NavItem
