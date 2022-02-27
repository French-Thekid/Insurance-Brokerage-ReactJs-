import React, { useRef, useContext } from 'react'
import 'styled-components/macro'
import { Core } from 'components'
import { useOnClickOutside } from 'hooks'
import { useHistory } from 'react-router'
import { ColourContext } from 'context'

export default function Menu({
  show,
  right = '28px',
  top = '35px',
  children,
  action,
  override,
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    action(false)
    return null
  })
  const { Colours } = useContext(ColourContext)

  let mode = localStorage.getItem('Theme') || ''

  return show ? (
    <div
      ref={ref}
      css={`
        position: absolute;
        transform: translateY(-1px);
        z-index: 10000;
        right: ${right};
        margin-top: ${top};
        min-height: 100px;
        min-width: 200px;
        border-radius: 5px;
        grid-template-rows: max-content 1fr;
        background: ${Colours.foreground};
        border: 0.5px solid ${Colours.border};
        box-shadow: ${mode === 'Dark'
          ? '0px 3px 13px -6px rgba(16,15,28,1)'
          : mode === 'Light' || mode === ''
          ? '0px 3px 13px -6px rgba(41, 41, 41, 1)'
          : 'none'};
      `}
    >
      <div
        css={`
          height: 40px;
          width: 100%;
          display: grid;
          place-items: center;
          box-shadow: ${mode === 'Dark'
            ? '0px 0px 2px 0px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 0px 2px 0px rgba(166, 166, 166, 1)'
            : 'none'};
        `}
      >
        <Core.Text>{override || 'Actions'}</Core.Text>
      </div>
      <div
        css={`
          width: calc(100% - 20px);
          padding: 10px;
        `}
      >
        {children}
      </div>
    </div>
  ) : null
}

export const MenuItems = ({
  Icon,
  title = 'Action',
  path,
  setshowMenu,
  noIcon,
  action,
}) => {
  const history = useHistory()
  let mode = localStorage.getItem('Theme') || ''
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        z-index: 1000;
        width: calc(100% - 20px);
        padding: 0px 10px;
        height: 40px;
        display: grid;
        align-items: center;
        justify-items: ${noIcon ? 'center' : 'start'};
        grid-column-gap: 20px;
        grid-template-columns: ${noIcon ? '1fr' : 'max-content 1fr'};
        color: ${Colours.textGrey};
        &:hover {
          cursor: pointer;
          color: ${Colours.blue};
          background: ${mode === 'Dark' ? '#141124' : '#f3f5ff'};
        }
      `}
      onClick={() => {
        if (action) action()
        setshowMenu(false)
        if (path) history.push(path)
      }}
    >
      {!noIcon && <Icon />}
      {title}
    </div>
  )
}
