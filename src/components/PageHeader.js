import React, { useContext } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { ColourContext } from 'context'
import { Icons, Core } from 'components'

export default function PageHeader({
  title,
  children,
  xAxis = '-140px',
  close = null,
  noBack = false,
}) {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: ${noBack
          ? '1fr max-content'
          : '40px 1fr max-content'};
        background: ${Colours.foreground};
        border-bottom: 1px solid ${Colours.border};
        border-top: 1px solid ${Colours.border};
        padding: 5px 10px;
        align-items: center;
        margin-bottom: 10px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      `}
    >
      {noBack === false && (
        <section
          onClick={() => {
            if (close !== null) close()
            else history.goBack()
          }}
          css={`
            display: grid;
            place-items: center;
            padding: 3px;
            width: max-content;
            border-radius: 50%;
            transition: ease-out 0.2s;
            color: ${Colours.iconInactive};
            &:hover {
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateX(-2px);
              color: ${Colours.blue};
            }
          `}
        >
          <Icons.ArrowBackRounded style={{ color: 'inherit' }} />
        </section>
      )}
      <Core.Text weight="600" color={Colours.blue}>
        {title}
      </Core.Text>
      <div
        css={`
          display: visible;
          @media (max-width: 376px) {
            display: grid;
            grid-row-gap: 10px;
            display: none;
          }
          @media (min-width: 376px) {
            display: flex;
            grid-gap: 10px;
          }
        `}
      >
        {children}
      </div>
      <div
        css={`
          @media (min-width: 376px) {
            display: none;
          }
          @media (max-width: 376px) {
            display: visible;
          }
          &:hover {
            cursor: pointer;
          }
        `}
      >
        <Core.Dropdown
          x={xAxis}
          width="max-content"
          items={[
            {
              type: 'any',
              component: children,
            },
          ]}
        >
          <Core.Box mg="0px" color="#111">
            <Icons.MoreVert />
          </Core.Box>
        </Core.Dropdown>
      </div>
    </div>
  )
}
