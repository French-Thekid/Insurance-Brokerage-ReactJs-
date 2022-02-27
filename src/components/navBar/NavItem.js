import React, { useContext } from 'react'
import 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { ColourContext } from 'context'

const NavItem = ({ children, left, active, ...props }) => {
  const { Colours } = useContext(ColourContext)

  return (
    <NavLink
      css={`
        transition: ease-out 1s;
        color: ${active ? Colours.blue : Colours.text};
        font-weight: 600;
        font-size: 0.8em;
        border: none;
        border-bottom: ${active ? `3px solid ${Colours.blue}` : `none`};
        background: ${active ? `rgba(2,96,178,0.09)` : `none`};
        margin-left: ${left ? '30px' : '0px'};
        /* transition: all 300ms linear 0s; */
        text-decoration: none;
        cursor: pointer;
        padding: 14px 15px 15px 15px;
        transition: ease-out 0.1s;
        outline: none;
        &:hover {
          color: ${Colours.blue};
          transition: ease-out 0.1s;
          transform: ${active ? 'none' : 'translateY(-2px)'};
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
