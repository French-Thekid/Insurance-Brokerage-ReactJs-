import React from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'

import { EmailContent, Loading, Content } from 'components'
import EmailViewer from './EmailViewer'
import { useRouteMatch } from 'react-router-dom'
import { LIST_EMAIL } from './queries'

function Emails() {
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading, error, data } = useQuery(LIST_EMAIL, {
    variables: { accountId: parseInt(accountId) },
    pollInterval: 10000,
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load emails'} />

  const { listEmail } = data
  const emailSet = listEmail.data

  // Sorting Emails
  emailSet.sort(
    (a, b) => new Date(parseInt(b.timestamp)) - new Date(parseInt(a.timestamp))
  )

  //Seperating incomming Mails from Sent Mails V2
  const incommingEmails = emailSet
    .map((email) => {
      if (
        JSON.parse(email.attributes) &&
        JSON.parse(email.attributes).type === 'inBound'
      ) {
        return email
      }
      return null
    })
    .filter((val) => val)

  const outGoingEmails = emailSet
    .map((email) => {
      if (
        JSON.parse(email.attributes) &&
        JSON.parse(email.attributes).type === 'outBound'
      ) {
        //Removing invitations & workflow from email sent
        if (
          JSON.parse(email.attributes).subject.includes('Invitation') ||
          JSON.parse(email.attributes).subject.includes('Workflow for account')
        ){
          return null
        }
        else return email
  
      }
      return null
    })
    .filter((val) => val)



  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 1fr;
        height: 100%;
        grid-column-gap: 10px;
      `}
    >
      <EmailContent.SidePanel
        Incoming={incommingEmails}
        OutGoing={outGoingEmails}
      />
      <EmailViewer emails={emailSet} />
    </div>
  )
}

export default Emails
