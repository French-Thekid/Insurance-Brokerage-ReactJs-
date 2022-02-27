import React from 'react'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import logo from '../../assets/logo.svg'
import { Colours } from 'components'

import banner from '../../assets/banner.png'

function Panel({ children }) {
  const props = useSpring({
    config: { duration: 600 },
    from: { top: '200px', opacity: 0 },
    to: { top: '0px', opacity: 1 },
  })

  return (
    <div
      css={`
        display: grid;
        height: 100vh;
        grid-template-columns: 1fr 1fr;
        @media only screen and (max-width: 320px) {
          grid-template-columns: 10px 1fr;
        }
        @media only screen and (max-width: 375px) {
          grid-template-columns: 10px 1fr;
        }
        @media only screen and (max-width: 475px) {
          grid-template-columns: 10px 1fr;
        }
      `}
    >
      <div
        css={`
          background: linear-gradient(
            45deg,
            rgba(90, 85, 170, 1) 0%,
            rgba(90, 85, 170, 1) 20%,
            rgba(0, 115, 215, 1) 100%
          );
        `}
      >
        <div
          css={`
            background-image: url('${banner}');
            background-position-y: bottom;
            background-size: contain;
            background-repeat: no-repeat;
            height: 100%;
          `}
        />
      </div>

      <div
        css={`
          height: calc(100% - 40px);
          display: grid;
          align-items: center;
          padding: 20px;
          background: #fff;
        `}
      >
        <animated.div
          css={`
            display: grid;
            justify-items: center;
            align-items: center;
            grid-template-rows: max-content max-content;
            grid-row-gap: 30px;
            height: max-content;
          `}
          style={props}
        >
          <div
            css={`
              display: grid;
              justify-items: center;
              align-items: center;
              height: max-content;
            `}
          >
            <img src={logo} alt="logo" height="100" />
            <h1
              css={`
                margin: 15px 0px 0px 0px;
                padding: 0px;
                color: ${Colours.blue};
                letter-spacing: 5px;
              `}
            >
              {'PRINTZ'.toUpperCase()}
            </h1>
          </div>
          <div
            css={`
              height: 100%;
              width: 100%;
              display: grid;
              justify-items: center;
              padding: 20px;
            `}
          >
            {children}
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default Panel
