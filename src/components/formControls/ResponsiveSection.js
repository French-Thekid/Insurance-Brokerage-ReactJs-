import React from 'react'
import 'styled-components/macro'

export default function ({ rowSpace, children, cols = 2 }) {
  return (
    <div
      css={`
        width: 100%;
        display: grid;
        grid-template-columns: ${cols === 4
          ? '1fr 1fr 1fr 1fr'
          : cols === 3
          ? '1fr 1fr 1fr'
          : '1fr 1fr'};
        grid-gap: ${cols === 2 || rowSpace ? '20px' : '10px'};
        margin: 5px 0px;
        @media (max-width: 769px) {
          grid-template-columns: ${cols === 4 && '1fr 1fr 1fr'};
        }
        @media (max-width: 376px) {
          grid-template-columns: ${cols >= 2 && '1fr'};
        }
      `}
    >
      {children}
    </div>
  )
}
