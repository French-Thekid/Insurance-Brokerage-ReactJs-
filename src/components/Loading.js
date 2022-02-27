import React from 'react'
import { css } from 'styled-components'
import 'styled-components/macro'
import loading from 'assets/loading.svg'

function Loading({ small, overlay, half }) {
  return (
    <div
      css={`
        width: 100vh;
        height: 100vh;
        display: grid;
        margin: 0 auto;
        justify-items: center;
        align-items: center;
        ${
          small &&
          css`
            width: auto;
            height: auto;
          `
        }
        ${
          overlay &&
          css`
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background: white;
            opacity: 0.4;
          `
        }
          ${
            half &&
            css`
              width: 50%;
            `
          }
      `}
    >
      <img src={loading} height={small ? `80` : `200`} alt="loading" />
    </div>
  )
}

export default Loading
