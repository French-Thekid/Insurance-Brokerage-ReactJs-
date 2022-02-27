import React, { useContext } from 'react'
import 'styled-components/macro'
import {
  EmailPanel,
  EventPanel,
  NotePanel,
  PolicyPanel,
  SlipPanel,
} from './panels'
import { useQuery } from '@apollo/react-hooks'
import { GET_CALENDAR } from '../events/queries'
import { READACCOUNT } from '../../../../../context/queries'
import { OrganisationContext } from 'context'
import { useRouteMatch } from 'react-router-dom'
import WorkflowDetails from './WorkflowDetails'
import AccountDetails from './AccountDetails'
import { Loading } from 'components'

function DetailContainer({ children }) {
  return (
    <div
      css={`
        height: 350px;
      `}
    >
      {children}
    </div>
  )
}
function Details() {
  const { templates } = useContext(OrganisationContext)
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading: accountLoading, data: account = {} } = useQuery(
    READACCOUNT,
    {
      variables: { accountId: parseInt(accountId) },
    }
  )

  const {
    loading: fetchingCalendar,
    error: errorFetchingCalendar,
    data: calendarData,
  } = useQuery(GET_CALENDAR, {
    variables: { accountId: parseInt(accountId) },
  })

  if (fetchingCalendar) return null
  if (errorFetchingCalendar) console.log('Fail to get calendar')

  let { readAccountCalendar = [] } = calendarData || []
  if (readAccountCalendar === null) readAccountCalendar = []

  if (calendarData && readAccountCalendar.length !== 0) {
    localStorage.setItem('CalendarId', parseInt(readAccountCalendar[0].id))
  }
  if (accountLoading) return <Loading small />

  const { workflows } = templates || []
  const readAccount = account.readAccount

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: 2fr repeat(5, max-content);
        grid-gap: 20px;
      `}
    >
      <div
        css={`
          height: max-content;
          margin-bottom: 10px;
          /* display: flex;
          flex-wrap: wrap;
          grid-column-gap: 20px; */
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          grid-gap: 20px;
          @media (max-width: 1025px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <AccountDetails />
        <WorkflowDetails account={readAccount} workflows={workflows} />
      </div>
      <DetailContainer>
        <EmailPanel />
      </DetailContainer>
      {readAccountCalendar.length !== 0 && (
        <DetailContainer>
          <EventPanel
            calendarId={
              readAccountCalendar.length !== 0 && readAccountCalendar[0].id
            }
          />
        </DetailContainer>
      )}
      <DetailContainer>
        <NotePanel />
      </DetailContainer>
      <DetailContainer>
        <PolicyPanel />
      </DetailContainer>
      <DetailContainer>
        <SlipPanel />
      </DetailContainer>
    </div>
  )
}

export default Details
