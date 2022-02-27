import React from 'react'
import 'styled-components/macro'

import companyLogo from 'assets/logo.svg'
import { Colours, Core } from 'components'

export default function ({ avatar, slipTitle, policyId }) {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 100px 1fr max-content;
        grid-column-gap: 10px;
        align-items: center;
        height: 50px;
        width: 100%;
        justify-items: center;
      `}
    >
      <img
        alt="company logo"
        src={avatar ? avatar : companyLogo}
        css={`
          height: 50px;
          width: 50px;
          border-radius: 50%;
        `}
      />
      <Core.Text weight="600">{slipTitle}</Core.Text>
      <section>
        <Core.Text
          customSize="10px"
          weight="600"
          color={Colours.blue}
        >{`Policy No. ${policyId}`}</Core.Text>
        <Core.Text
          customSize="10px"
          weight="600"
        >{`Markup and Return`}</Core.Text>
      </section>
    </div>
  )
}
