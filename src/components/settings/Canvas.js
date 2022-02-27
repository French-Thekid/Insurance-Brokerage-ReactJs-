import React from 'react'
import 'styled-components/macro'

function Canvas(props) {
  return (
    <div
      css={`
        background: radial-gradient(#d0d0d0 15%, transparent 16%),
          radial-gradient(#d0d0d0 15%, transparent 16%), #fff;
        background-position: 0 0, 80px 80px;
        background-repeat: repeat;
        background-size: 8px 8px;
        height: calc(100% - 20px);
        border-radius: 5px;
        padding: 10px;
      `}
      {...props}
    >
      {props.children}
    </div>
  )
}

export default Canvas
