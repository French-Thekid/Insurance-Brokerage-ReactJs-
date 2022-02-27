import React, { useContext } from 'react'
import { ReactMultiEmail } from 'react-multi-email'
import 'react-multi-email/style.css'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Core } from 'components'

function Input({ label = 'To: ', email = {}, setEmails }) {
  const { Colours } = useContext(ColourContext)
  const style = {
    width: '100%',
    margin: '0px',
    marginBottom: '2px',
    marginTop: '0px',
    border: 'none',
    borderRadius: '0px',
    padding: '0px',
    backgroundColor: 'inherit',
    // paddingBottom: '3px',
  }
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr;
        border-bottom: 1px solid #e7e7e7;
        align-items: center;
        grid-column-gap: 10px;
        &:hover {
          border-bottom: 1px solid ${Colours.blue};
          cursor: pointer;
        }
      `}
    >
      <Core.Text>{label}</Core.Text>
      <ReactMultiEmail
        style={style}
        placeholder="eg example@test.com"
        emails={email.emails}
        onChange={(_emails) => {
          setEmails({ emails: _emails })
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div
              data-tag
              key={index}
              css={`
                margin: 0px;
                padding: 0px;
              `}
            >
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          )
        }}
      />
    </div>
  )
}

export default Input
