import React from 'react'
import 'styled-components/macro'

export function Flex(props) {
  return (
    <div
      style={props.style}
      css={`
        display: flex;
        flex-direction: ${props.direction || 'row'};
        flex-wrap: ${props.wrap || 'no-wrap'};
        align-items: ${props.align || 'initial'};
        justify-content: ${props.justify || 'flex-start'};
        box-shadow: ${props.highlight
          ? `0px 0px 0px 2px ${
              props.highlight !== true ? props.highlight : 'red'
            }`
          : null};
        flex-basis: ${props.basis || 'auto'};
        background: ${props.bg || 'inherit'};
      `}
    >
      {props.children}
    </div>
  )
}
