import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Content, Loading } from 'components'
import { LIST_EVENTS } from '../../events/queries'
import { Table } from 'components'
import moment from 'moment'

export default function ({ calendarId }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()
  // const calendarId = parseInt(localStorage.getItem('CalendarId'))

  const {
    loading,
    error,
    data: eventData,
  } = useQuery(LIST_EVENTS, {
    variables: {
      accountId: parseInt(accountId),
      calendarId: parseInt(calendarId),
    },
  })

  if (loading) return <Loading small />
  if (error && calendarId)
    return <Content.Alert type="error" message={'Fail to load recent events'} />

  const HeaderData = ['Title', 'Start Date', 'End Date', 'Description']
  const RowData = eventData.listCalendarEvents.map(
    ({ title, startDate, endDate, description, id }, index) => {
      return {
        title,
        startDate: new Date(
          moment(
            new Date(
              new Date(parseInt(startDate)).setDate(
                new Date(parseInt(startDate)).getDate() + 1
              )
            )
          ).add(5, 'hours')
        )
          .toString()
          .split('G')[0],
        endDate: new Date(
          moment(
            new Date(
              new Date(parseInt(endDate)).setDate(
                new Date(parseInt(endDate)).getDate() + 1
              )
            )
          ).add(5, 'hours')
        )
          .toString()
          .split('G')[0],
        description,
        id,
      }
    }
  )

  const handleRowClick = (id) =>
    history.push(`/broker/account/events/${accountId}?action=view&id=${id}`)

  return (
    <Table
      MainButtonpath={`/broker/account/events/${accountId}/?action=create&&mark=${new Date()}`}
      justify="start"
      alignment="start"
      title="Events"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      buttonTitle="Create Event"
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
