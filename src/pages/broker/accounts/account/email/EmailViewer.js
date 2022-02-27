import React, { useContext } from 'react'
import 'styled-components/macro'
import Placeholder from './Placeholder'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import ComposeEmail from './ComposeEmail'
import ReadEmail from './ReadEmail'
import ReplyEmail from './ReplyEmail'
import ForwardEmail from './ForwardEmail'
import { GET_EMAIL } from './queries'
import { ColourContext } from 'context'

import { Core, Icons } from 'components'

const queryString = require('query-string')

function EmailViewer({ emails }) {
  const { search } = useLocation()
  const {
    params: { accountId },
  } = useRouteMatch()

  const { action, mainAction, secondaryAction, emailId } =
    queryString.parse(search)

  const hasEmail = action === 'read' && secondaryAction === undefined
  const composeEmail = mainAction === 'compose'
  const replyToEmail = action === 'read' && secondaryAction === 'reply'
  const forwardEmail = action === 'read' && secondaryAction === 'forward'

  let Email = {}
  emails.map((email) => (email.id === emailId ? (Email = email) : null))

  //QUERY
  const { loading, error, data } = useQuery(GET_EMAIL, {
    variables: { accountId: parseInt(accountId), emailId },
  })
  if (loading) return null

  return (
    <div
      css={`
        display: grid;
        align-items: center;
        justify-items: center;
        overflow-y: auto;
        @media (max-width: 376px) {
          display: none;
        }
      `}
    >
      {hasEmail ? (
        <ReadEmail
          accountId={accountId}
          email={Email}
          emailId={emailId}
          error={error}
          extLoading={loading}
        />
      ) : replyToEmail ? (
        <ReplyEmail email={Email} data={data} />
      ) : forwardEmail ? (
        <ForwardEmail email={Email} data={data} />
      ) : (
        <Placeholder />
      )}
      {composeEmail && <ComposeEmail />}
    </div>
  )
}

export default EmailViewer

export const EmailModal = ({ title = 'New Mail', children }) => {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        z-index: 10000;
        height: 550px;
        width: 500px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        position: absolute;
        bottom: 0;
        right: 0;
        background: ${Colours.foreground};
        border: 1px solid ${Colours.border};
        -webkit-box-shadow: -19px -12px 50px -49px rgba(102, 102, 102, 1);
        -moz-box-shadow: -19px -12px 50px -49px rgba(102, 102, 102, 1);
        box-shadow: -19px -12px 50px -49px rgba(102, 102, 102, 1);
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          padding: 10px;
          display: grid;
          grid-template-columns: 1fr max-content;
          align-items: center;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text customSize="18px">{title}</Core.Text>
        <section
          onClick={() => history.goBack()}
          css={`
            color: ${Colours.text};
            transition: ease-out 0.2s;
            &:hover {
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateY(-1px);
              color: ${Colours.red};
            }
          `}
        >
          <Icons.CloseIcon style={{ color: 'inherit' }} />
        </section>
      </div>
      <div
        css={`
          height: 100%;
        `}
      >
        {children}
      </div>
    </div>
  )
}
