import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { ColourContext } from 'context'

import { Core, Content, Icons, Loading } from 'components'
import Header from './Headers'
import Row from './Rows'
import { timestampToTime } from 'utils'
import { DELETE_EMAIL } from '../../pages/broker/accounts/account/email/mutations'
import { LIST_EMAIL } from '../../pages/broker/accounts/account/email/queries'
import { Logger } from '../../utils'

export default function SidePanel({ Incoming, OutGoing }) {
  const { Colours } = useContext(ColourContext)
  const [emailToDisplay, setEmailToDisplay] = useState('Inbox')
  const { search, pathname } = useLocation()
  const {
    params: { accountId },
  } = useRouteMatch()

  const history = useHistory()

  const EmailsToShow = emailToDisplay === 'Inbox' ? Incoming : OutGoing

  const [deleteEmail, { loading }] = useMutation(DELETE_EMAIL, {
    refetchQueries: () => [
      {
        query: LIST_EMAIL,
        variables: { accountId: parseInt(accountId) },
      },
    ],
  })

  const handleDelete = (emailId) =>
    deleteEmail({
      variables: { id: emailId, accountId: parseInt(accountId) },
    })
      .then(() => {
        Logger('delete an email', 'general', emailId, () => {
          history.push(`/broker/account/email/${accountId}`)
        })
      })
      .catch((e) => console.log(e))

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content 1fr;
        border-right: 1px solid ${Colours.border};
        padding-right: 10px;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 120px;
          grid-gap: 10px;
          margin-bottom: 10px;
        `}
      >
        <Core.Text customSize="20px">Emails</Core.Text>
        <Core.Button
          onClick={() => {
            if (search.includes('?'))
              history.push(`${pathname}${`${search}&mainAction=compose`}`)
            else history.push(`?mainAction=compose&accountId=${accountId}`)
          }}
        >
          Compose
        </Core.Button>
      </div>
      <Header
        setEmailToDisplay={setEmailToDisplay}
        EmailToDisplay={emailToDisplay}
      />
      <div
        css={`
          overflow-y: auto;
          min-width: 315px;
        `}
      >
        {loading && <Loading small />}
        {EmailsToShow.map(
          (
            { id, to = [], sender = [], timestamp, subject, attributes },
            index
          ) => {
            let First = ''
            let last = ''
            const emailType = attributes && JSON.parse(attributes).type
            if (emailType === 'outBound') {
              First = to.length !== 0 ? to[0].email.toUpperCase() : 'U'
              last = to.length !== 0 ? to[0].email[1].toUpperCase() : 'U'
            } else {
              First = sender.length !== 0 ? sender[0].email.toUpperCase() : 'U'
              last =
                sender.length !== 0 ? sender[0].email[1].toUpperCase() : 'U'
            }

            return (
              <Row id={id} key={index}>
                <Content.Avatar
                  size="medium"
                  firstName={First}
                  lastName={last}
                  shadow
                />
                <div
                  css={`
                    display: grid;
                    grid-template-rows: max-content max-content;
                    grid-row-gap: 5px;
                    justify-items: start;
                    margin-left: 20px;
                    @media (max-width: 769px) {
                      grid-template-rows: 1fr;
                      margin-right: 10px;
                    }
                  `}
                  onClick={() =>
                    history.push(
                      `?action=read&accountId=${accountId}&emailId=${id}`
                    )
                  }
                >
                  <div
                    css={`
                      width: 150px;
                    `}
                  >
                    <Core.Text weight="700" size="sm" Contained>
                      {subject}
                    </Core.Text>
                  </div>
                  <div
                    css={`
                      width: 140px;
                      @media (max-width: 769px) {
                        display: none;
                      }
                    `}
                  >
                    <Core.Text Contained customSize="12px">
                      {attributes && JSON.parse(attributes).text}
                    </Core.Text>
                  </div>
                </div>
                <Core.Text weight="400" size="sm" color={Colours.blue}>
                  {timestampToTime(timestamp)}
                </Core.Text>
                <div
                  css={`
                    color: ${Colours.inactive};
                    display: grid;
                    place-items: center;
                    margin-left: 5px;
                    &:hover {
                      color: ${Colours.red};
                      cursor: pointer;
                      transition: ease-out 0.2s;
                      transform: translateY(-1px);
                    }
                  `}
                >
                  <Icons.DeleteRounded
                    onClick={() => handleDelete(id)}
                    style={{ fontSize: '15px', color: 'inherit' }}
                  />
                </div>
              </Row>
            )
          }
        )}
      </div>
    </div>
  )
}
