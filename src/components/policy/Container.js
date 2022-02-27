import React, { useContext } from 'react'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { ColourContext } from 'context'

import { PolicyComponents } from 'components'

function AccountContainer({ children }) {
  const style = useSpring({
    from: { transform: 'translate3d(0, 10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })
  const { Colours } = useContext(ColourContext)

  return (
    <animated.div
      style={style}
      css={`
        width: 100%;
        height: 100%;
        background: ${Colours.foreground};
        border-radius: 5px;
        z-index: 1;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <PolicyComponents.PolicyNavBar />
      <div
        css={`
          padding: 10px;
        `}
      >
        {children}
      </div>
    </animated.div>
  )
}

export default AccountContainer
