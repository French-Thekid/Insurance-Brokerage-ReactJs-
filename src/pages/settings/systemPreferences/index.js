import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import Headers from './Headers'
import Widgets from './Widgets'
import Preferences from './Preferences'
import { ColourContext } from 'context'

export default function () {
  const [active, setActive] = useState('PREFERENCES')
  const [mode, setMode] = useState(localStorage.getItem('Theme'))
  const { Colours, mode: M } = useContext(ColourContext)

  return (
    <div
      css={`
        height: calc(100% - 10px);
        border-radius: 10px;
        background-color: ${M === 'Dark'
          ? Colours.profileBackground
          : '#c3cbdc'};
        background-image: ${M === 'Dark'
          ? Colours.profileBackground
          : 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)'};
        display: grid;
        grid-template-rows: 50px 2fr;
        grid-row-gap: 20px;
        padding: 0px 10px 10px 10px;
      `}
    >
      <Headers active={active} setActive={setActive} />
      <div>
        {active === 'PREFERENCES' ? (
          <Preferences mode={mode} setMode={setMode} />
        ) : active === 'WIDGETS' ? (
          <Widgets />
        ) : null}
      </div>
    </div>
  )
}
