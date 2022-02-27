import React, { useContext } from 'react'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { ColourContext } from 'context'

function Container({ children, noScroll, background }) {
  const style = useSpring({
    from: { transform: 'translate3d(0, 10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })
  const { Colours } = useContext(ColourContext)
  return (
    <animated.div
      style={style}
      css={`
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        border-radius: 5px;
        padding: 10px;
        z-index: 0;
        transition-duration: ease-out 1s;
        overflow: ${noScroll ? 'hidden' : 'auto'};
        background: ${background || Colours.foreground};
      `}
    >
      {children}
    </animated.div>
  )
}

export default Container
