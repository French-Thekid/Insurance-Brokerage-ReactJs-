import React from 'react'
import 'styled-components/macro'

export default function Section({
  children,
  marginBottom = '10px',
  marginTop = '10px',
  visibility = true,
  ...rest
}) {
  return (
    <section
      css={`
        width: 100%;
        margin-bottom: ${marginBottom};
        margin-top: ${marginTop};
        display: ${visibility ? 'inherit' : 'none'};
      `}
      {...rest}
    >
      {children}
    </section>
  )
}
