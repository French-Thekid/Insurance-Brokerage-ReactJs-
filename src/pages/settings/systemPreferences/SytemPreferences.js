import React, { useState } from 'react'
import 'styled-components/macro'
import Headers from './Headers'
// import Widgets from './Widgets'
// import Preferences from './Preferences'

export const Label = ({ children }) => (
  <label
    css={`
      padding: 0px 0px 3px 5px;
      margin: 2px 0px;
      border-bottom: 1px solid white;
      font-size: 16px;
      color: #7c7c7c;
    `}
  >
    {children}
  </label>
)

export const Section = ({ children, style, cols = '75px auto' }) => (
  <section
    css={`
      display: grid;
      grid-template-columns: ${cols};
      margin-top: 15px;
      margin-bottom: 25px;
    `}
    style={style}
  >
    {children}
  </section>
)

function SystemPreferences() {
  const [active, setActive] = useState('PREFERENCES')
  const [mode, setMode] = useState(localStorage.getItem('Theme'))

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr;
        height: calc(100vh - 85px);
      `}
    >
      Hello
      {/* <div
        css={`
          border-radius: 10px;
          background-color: #c3cbdc;
          background-image: linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%);
          display: grid;
          grid-template-rows: 50px 2fr;
          grid-row-gap: 20px;
          padding: 0px 10px 10px 10px;
        `}
      >
        <Headers active={active} setActive={setActive} />
        {/* <div css={``}>
          {active === 'PREFERENCES' ? (
            <Preferences mode={mode} setMode={setMode} />
          ) : active === 'WIDGETS' ? (
            <Widgets />
          ) : null}
        </div> 
      </div> */}
    </div>
  )
}
export default SystemPreferences
