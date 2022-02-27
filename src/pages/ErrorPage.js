import React from 'react'
import logo from 'assets/logo.svg'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'
import { Colours } from 'components'
import { useSpring, animated } from 'react-spring'

export default function ErrorPage() {
  const history = useHistory()
  const style = useSpring({
    from: { transform: 'translate3d(0, 10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })

  return (
    <animated.div
      style={style}
      css={`
        margin: 100px auto;
        width: 100%;
        text-align: center;
      `}
    >
      <img
        src={logo}
        css={`
          margin: auto;
        `}
        width="200px"
        height="200px"
        alt="Logo"
      />

      <p
        css={`
          font-size: 40px;
          color: ${Colours.text};
        `}
      >
        404
      </p>

      <p
        css={`
          font-size: 25px;
          color: ${Colours.text};
        `}
      >
        Whoops!! Page not found
      </p>

      <hr
        css={`
          width: 50%;
          margin: 10px auto 10px auto;
          border: 1px solid ${Colours.seperator};
        `}
      />

      <p
        css={`
          color: ${Colours.text};
        `}
      >
        Try refreshing this page, or going back and attempting the action again.
        <br />
        Please contact your Support if this problem persist.
      </p>

      <button
        css={`
          text-decoration: none;
          color: ${Colours.blue};
          font-size: 15px;
          outline: none;
          background-color: inherit;
          border: none;
          margin-top: 20px;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          history.goBack()
        }}
      >
        Go back
      </button>
    </animated.div>
  )
}
