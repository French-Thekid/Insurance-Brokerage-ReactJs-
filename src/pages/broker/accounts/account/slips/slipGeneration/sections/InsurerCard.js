import React, { useState } from 'react'
import 'styled-components/macro'
import Users from 'assets/user.png'

import { Core, Colours, Icons, Content } from 'components'

export default function ({
  image = Users,
  firstName,
  lastName,
  email,
  policyId,
  company,
  setInsurerEmails,
  id,
}) {
  const [sources, setSources] = useState(false)
  return (
    <div
      css={`
        width: calc(100% - 22px);
        height: 50px;
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: 35px 1fr max-content;
        grid-column-gap: 10px;
        border: 1px solid ${sources ? Colours.green : Colours.border};
        border-radius: 5px;
        align-items: center;
        padding: 10px;
        &:hover {
          cursor: pointer;
          border: 0.1px solid ${Colours.blue};
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.3s;
      `}
      onClick={() => {
        if (sources === false) {
          //Getting Insurers Emails
          setInsurerEmails &&
            setInsurerEmails((state) => {
              const Emails = state.Emails.concat(email)
              return {
                Emails,
              }
            })
        } else {
          //Removing Insurers Emails
          setInsurerEmails &&
            setInsurerEmails((state) => {
              let index = state.Emails.indexOf(email)
              const Emails = state.Emails.filter(
                (item, justifyIndex) => index !== justifyIndex
              )
              return {
                Emails,
              }
            })
        }
        setSources((state) => {
          return !state
        })
      }}
    >
      <Content.Avatar src={image} firstName={firstName} lastName={lastName} />

      <div
        css={`
          width: 140px;
          @media (min-width: 1900px) {
            width: 165px;
          }
        `}
      >
        <Core.Text weight="650" size="sm" Contained>
          {company}
        </Core.Text>
        <Core.Text size="sm" Contained>
          {`${firstName} ${lastName}`}
        </Core.Text>
      </div>
      <div
        css={`
          display: ${sources ? 'visible' : 'none'};
        `}
      >
        <Icons.CheckCircleRounded style={{ color: Colours.green }} />
      </div>
      <div
        css={`
          height: 100%;
          display: ${sources ? 'none' : 'visible'};
        `}
      >
        <Icons.AddRounded style={{ fontSize: '20px', color: Colours.blue }} />
      </div>
    </div>
  )
}
