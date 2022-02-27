import React, { useContext } from 'react'
import 'styled-components/macro'
import { OrganisationContext, ColourContext } from 'context'

function Button(props) {
  const { status } = useContext(OrganisationContext)
  const { Colours } = useContext(ColourContext)
  const {
    children,
    selfContained,
    bgColour = Colours.blue,
    fontColour = 'white',
    width = '100%',
    height = 'max-content',
    type = 'button',
    bottomMargin = '0px',
    disabled,
    action,
    ...rest
  } = props

  let mode = localStorage.getItem('Theme') || ''

  const isSuspended = (action, status, disabled) => {
    const area = window.location.pathname.split('/')
    if (
      status === 'SUSPENDED' &&
      action !== 'READ' &&
      area.includes('broker')
    ) {
      return true
    } else if (disabled) {
      return true
    } else {
      return false
    }
  }

  return (
    <button
      css={`
        width: ${selfContained ? 'max-content' : width};
        min-width: ${selfContained ? 'max-content' : '100px'};
        height: ${height};
        background: ${bgColour};
        color: ${fontColour};
        border: none;
        padding: 6px 10px;
        box-shadow: ${`0px 0px 2px 0px rgba(166, 166, 166, 1)`};
        box-shadow: ${mode === 'Dark'
          ? '0px 0px 2px 0px rgba(16,15,28,1)'
          : mode === 'Light' || mode === ''
          ? '0px 0px 2px 0px rgba(166, 166, 166, 1)'
          : 'none'};
        border-radius: 3px;
        display: grid;
        justify-items: Center;
        outline: none;
        align-items: Center;
        transition: ease-out 0.2s;
        margin-bottom: ${bottomMargin ? bottomMargin : bottomMargin};
        &:hover {
          cursor: pointer;
          box-shadow: ${mode === 'Dark'
            ? '0px 6px 20px -6px rgba(16, 15, 28, 1)'
            : mode === 'Light' || mode === ''
            ? '0px 3px 13px -6px rgba(41, 41, 41, 1)'
            : 'none'};
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          filter: grayscale(40%);
        }
      `}
      disabled={isSuspended(action, status, disabled)}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

function ButtonWithImage(props) {
  const { children, src = '#', bgColour, ...rest } = props
  return (
    <Button bgColour={bgColour} {...rest}>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 2fr;
          align-items: center;
          text-align: left;
          width: 100%;
        `}
      >
        <img
          src={src}
          alt="Logo"
          css={`
            margin: 0 auto;
          `}
        />
        <p
          css={`
            margin: 0;
            font-weight: 600;
            font-size: 12px;
          `}
        >
          {children}
        </p>
      </div>
    </Button>
  )
}

export { ButtonWithImage }
