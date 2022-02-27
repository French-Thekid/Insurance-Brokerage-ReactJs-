import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { usePermission } from 'hooks'
import { Content, Core, Icons, EmailContent, Loading } from 'components'
import { useLocation, useHistory } from 'react-router-dom'
import { timestampToTime } from 'utils'
import { GET_EMAIL } from './queries'
import { useQuery } from '@apollo/react-hooks'
import { ColourContext } from 'context'

export default function ReadEmail({ email, accountId, emailId, extLoading }) {
  const [permissions, Access] = usePermission()
  const [, /*showAttachment*/ setShowAttachment] = useState({
    show: false,
    url: '',
    name: '',
  })

  const { subject, attributes, timestamp, to = [], sender = [] } = email || {}

  let Letter = ''
  let SecondLetter = ''
  const emailType = attributes && JSON.parse(attributes).type
  if (emailType === 'outBound') {
    Letter = to.length !== 0 && to[0].email[0].toUpperCase()
    SecondLetter = to.length !== 0 && to[0].email[1].toUpperCase()
  } else {
    Letter = sender.length !== 0 && sender[0].email[0].toUpperCase()
    SecondLetter = sender.length !== 0 && sender[0].email[1].toUpperCase()
  }

  //QUERY
  const { loading, error, data } = useQuery(GET_EMAIL, {
    variables: { accountId: parseInt(accountId), emailId },
  })
  if (loading || extLoading) return <Loading small />

  return (
    <>
      {permissions.EMAIL_READ_TYPEACCOUNT ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-gap: 5px;
            height: 100%;
            width: 100%;
            overflow: auto;
          `}
        >
          <EmailHeader
            firstName={Letter}
            lastName={SecondLetter}
            to={to}
            subject={subject}
            time={timestamp}
          />
          <EmailDisplay
            accountId={accountId}
            setShowAttachment={setShowAttachment}
            error={error}
            data={data}
            attributes={attributes}
            text={attributes && JSON.parse(attributes).text}
          />
        </div>
      ) : (
        <Access />
      )}
    </>
  )
}

const EmailHeader = ({
  firstName,
  lastName,
  to = [],
  subject = '',
  time = '',
}) => {
  let receiverCount = 0
  const { search, pathname } = useLocation()
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr 115px max-content;
        @media (max-width: 769px) {
          grid-template-columns: max-content 220px 115px max-content;
          overflow: auto;
        }
        grid-column-gap: 10px;
        border-bottom: 2px solid ${Colours.border};
        padding-bottom: 10px;
        align-items: center;
      `}
    >
      <Content.Avatar
        size="large"
        firstName={firstName || 'U'}
        lastName={lastName || 'U'}
        shadow
      />{' '}
      <div
        css={`
          display: grid;
          grid-template-rows: max-content max-content;
          grid-row-gap: 5px;
        `}
      >
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            overflow: auto;
          `}
        >
          {to.map((receiver, index) => {
            receiverCount++
            if (window.screen.width < 769) {
              if (index < 1)
                return (
                  <EmailContent.EmailWrapper key={index}>
                    {receiver.email}
                  </EmailContent.EmailWrapper>
                )
              return null
            } else if (index < 2)
              return (
                <EmailContent.EmailWrapper key={index}>
                  {receiver.email}
                </EmailContent.EmailWrapper>
              )
            return null
          })}
          {window.screen.width < 769 && receiverCount > 1 ? (
            <Core.Text size="sm" color={Colours.blue}>
              {' '}
              and {receiverCount - 1} more.
            </Core.Text>
          ) : receiverCount > 2 ? (
            <Core.Text size="sm" color={Colours.blue}>
              {' '}
              and {receiverCount - 2} more.
            </Core.Text>
          ) : null}
        </div>
        <Core.Text weight="650">{subject}</Core.Text>
      </div>
      <Core.Text color={Colours.darkBlue} customSize="12px">{`${new Date(
        new Date(parseInt(time)).setDate(new Date(parseInt(time)).getDate() + 1)
      ).toDateString()} ${timestampToTime(time)}`}</Core.Text>
      <div
        css={`
          border-left: 1px solid ${Colours.border};
          height: 100%;
          display: grid;
          grid-template-columns: repeat(2, max-content);
          grid-gap: 10px;
          padding: 0px 5px;
          align-items: center;
        `}
      >
        <div
          css={`
            color: ${Colours.text};
            transition: ease-out 0.2s;
            &:hover {
              color: ${Colours.blue};
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateX(-2px);
            }
          `}
          onClick={() =>
            history.push(`${pathname}${`${search}&secondaryAction=reply`}`)
          }
        >
          <Icons.ReplyIcon style={{ fontSize: '35px', color: 'inherit' }} />
        </div>
        <div
          css={`
            color: ${Colours.text};
            transition: ease-out 0.2s;
            transform: scaleX(-1);
            &:hover {
              color: ${Colours.blue};
              cursor: pointer;
              transition: ease-out 0.2s;
              transform: translateX(2px) scaleX(-1);
            }
          `}
          onClick={() =>
            history.push(`${pathname}${`${search}&secondaryAction=forward`}`)
          }
        >
          <Icons.ReplyIcon style={{ fontSize: '35px', color: 'inherit' }} />
        </div>
      </div>
    </div>
  )
}

function EmailDisplay({
  attributes,
  attachment,
  error,
  setShowAttachment,
  data = { getEmail: { attachments: [] } },
  accountId,
}) {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)
  if (error) {
    if (
      error.message ===
      'Variable "$emailId" of required type "String!" was not provided.'
    ) {
      console.log('hadling soft error')
      history.push(`/broker/account/email/${accountId}`)
    } else
      return <Content.Alert type="error" message="Failed to fetch email body" />
  }
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 20px;
        overflow: auto;
      `}
    >
      <div
        css={`
          margin: 0px;
          color: ${Colours.text};
          overflow: auto;
        `}
        dangerouslySetInnerHTML={{
          __html: attributes ? `${JSON.parse(attributes).html}` : '<p/>',
        }}
      />

      <div
        css={`
          display: flex;
        `}
      >
        {data.getEmail.attachments.map((attachment, index) => (
          <EmailContent.Attachment
            setShowAttachment={setShowAttachment}
            key={index}
            attachment={attachment}
          />
        ))}
      </div>
    </div>
  )
}
