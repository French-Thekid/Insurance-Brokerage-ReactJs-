import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { Icons } from 'components'
import { ColourContext } from 'context'

function Collapsible(props) {
  const { Colours } = useContext(ColourContext)
  const {
    children,
    title,
    main,
    mainTitleSize = '14px',
    flow = 'auto',
    displayType = 'block',
  } = props
  const [visibility, setVisibility] = useState(displayType)
  const collapsible = {
    backgroundColor: `${Colours.CollapsibleHeader}`,
    color: `${Colours.text}`,
    cursor: 'pointer',
    height: '40px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    fontSize: '15px',
    borderTop: '1px solid white',
    
  }

  const content = {
    padding: '20px 18px 20px 18px',
    marginBottom: '10px',
    display: visibility,
    overflow: flow,
    backgroundColor: `${Colours.CollapsibleBack}`,
    border: `1px solid ${Colours.border}`,
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  }

  return (
    <>
      <div
        {...props}
        style={collapsible}
        css={`
          display: grid;
          grid-template-columns: auto 5fr auto;
          align-items: center;
        `}
        onClick={() => {
          if (visibility === 'none') setVisibility('block')
          else setVisibility('none')
        }}
      >
        <label
          css={`
            padding-left: 18px;
            font-size: ${mainTitleSize};
            color: ${Colours.text};
          `}
        >
          {title}
        </label>
        <p />
        <section
          css={`
            align-items: center;
            display: grid;
            grid-template-columns: auto auto;
          `}
        >
          {main ? (
            <div
              style={{ color: Colours.red }}
              onClick={() => {
                main()
              }}
            >
              <Icons.DeleteRounded />
            </div>
          ) : (
            <p />
          )}
          <button
            type="button"
            css={`
              align-items: right;
              width: 50px;
              border: none;
              background-color: inherit;
              outline: none;
              color: ${Colours.inactive};
              &:hover {
                cursor: pointer;
                color: ${Colours.blue};
              }
            `}
            onClick={() => {
              if (visibility === 'none') setVisibility('block')
              else setVisibility('none')
            }}
          >
            {visibility === 'none' ? (
              <Icons.ArrowDropDownRounded style={{ color: 'inherit' }} />
            ) : (
              <Icons.ArrowDropUpRounded style={{ color: 'inherit' }} />
            )}
          </button>
        </section>
      </div>
      <div style={content}>{children}</div>
    </>
  )
}

export default Collapsible
