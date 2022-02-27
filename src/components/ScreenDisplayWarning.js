import React from 'react'
import 'styled-components/macro'

import PlaceHolder from 'assets/ohNo.gif'
import { Colours, Core } from 'components'

export default function () {
  return (
    <div
      css={`
        min-height: 100px;
        max-width: 300px;
        border: 1px solid ${Colours.border};
        background: #fff;
        border-radius: 5px;
        margin: auto;
        display: grid;
        grid-template-rows: 40px 1fr;
        box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
          0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
        min-width: 200px;
      `}
    >
      <div
        css={`
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: ${Colours.blue};
          padding: 10px;
        `}
      >
        <Core.Text color="#fff" weight="650">
          Compatibility Warning
        </Core.Text>
      </div>
      <div
        css={`
          padding: 20px 10px;
          display: grid;
          justify-items: center;
        `}
      >
        <img
          src={PlaceHolder}
          alt="img"
          css={`
            width: 220px;
            margin-bottom: 10px;
          `}
        />
        <Core.Text>
          <span
            css={`
              color: ${Colours.red};
            `}
          >
            The contents of this page cannot be accessed on your device, due to
            either its size or orientation.
          </span>
          <br />
          <br />
          <b>Please try one of the following to Continue.</b>
          <br />
          <br />
          <b
            css={`
              color: ${Colours.blue};
            `}
          >
            1
          </b>
          : Changing the Orientation of your device (Landscape/Portrait).
          <br />
          <br />
          <b
            css={`
              color: ${Colours.blue};
            `}
          >
            2
          </b>
          : Switching to a device with a larger display.
        </Core.Text>
      </div>
    </div>
  )
}
