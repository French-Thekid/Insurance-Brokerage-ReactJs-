import React from 'react'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'

import { Colours } from 'components'

function AccountContainer({ children }) {
  const style = useSpring({
    from: { transform: 'translate3d(0, 10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })

  return (
    <animated.div
      style={style}
      css={`
        width: 100%;
        height: 100%;
        background: ${Colours.foreground};
        border-radius: 5px;
        z-index: 0;
        display: grid;
        grid-template-rows: max-content 1fr;
        overflow-y: auto;
      `}
    >
      {children}
    </animated.div>
  )
}

export default AccountContainer
