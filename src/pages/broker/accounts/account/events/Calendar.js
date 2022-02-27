import React from 'react'
import 'styled-components/macro'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style/overrides.css'
import { useQuery } from '@apollo/react-hooks'

import CreateEvent from './CreateEvents'
import ViewEvent from './ViewEvent'
import { Core, Loading, Content } from 'components'
import { LIST_EVENTS } from './queries'

const queryString = require('query-string')
const localizer = momentLocalizer(moment)
/* eslint-disable */

export default function () {
  const history = useHistory()
  const match = useRouteMatch()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { accountId },
  } = match

  const {
    loading,
    error,
    data: eventData,
  } = useQuery(LIST_EVENTS, {
    variables: {
      accountId: parseInt(accountId),
    },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message="Failed to fetch Events" />

  const Events = eventData.listCalendarEvents.data.map(
    ({
      id,
      title,
      startDate,
      endDate,
      locationPremise,
      locationThoroughfare,
      description,
    }) => {
      let SDate = new Date(parseInt(startDate))
      SDate.setHours(SDate.getHours() + 5)

      let EDate = new Date(parseInt(endDate))
      EDate.setHours(EDate.getHours() + 5)

      return {
        id,
        title,
        allDay: false,
        start: SDate,
        end: EDate,
        Address1: locationPremise,
        Address2: locationThoroughfare,
        description,
      }
    }
  )

  const eventStyleGetter = (e) => {
    const { start = '' } = e || {}
    const day = start.toString().split(' ')[0]
    let colorKey = 0
    switch (day) {
      case 'Mon':
        colorKey = 1
        break
      case 'Tue':
        colorKey = 2
        break
      case 'Wed':
        colorKey = 3
        break
      case 'Thu':
        colorKey = 4
        break
      case 'Fri':
        colorKey = 5
        break
      case 'Sat':
        colorKey = 6
        break
      case 'Sun':
        colorKey = 0
        break
      default:
        colorKey = 0
        break
    }

    const colors = [
      '#FF715B',
      '#ffcc29',
      '#0A2E36',
      '#F45B69',
      '#EE6055',
      '#AF3B6E',
      '#C44900',
    ]

    var style = {
      backgroundColor: colors[colorKey],
      color: 'white',
      padding: '3px',
      textAlign: 'center',
      fontSmoothing: 'antialiased',
      border: '0px',
      display: 'block',
      borderRadius: '10px',
    }
    return {
      style: style,
    }
  }

  return (
    <>
      <div
        css={`
          padding: 5px;
          height: calc(100% - 10px);
          background: white;
          border-radius: 5px;
          display: grid;
          grid-template-rows: 1fr max-content;
          grid-gap: 10px;
        `}
      >
        <Calendar
          events={Events}
          selectable={true}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(slot) => {
            const { start } = slot
            const query = queryString.stringify({
              action: 'create',
              mark: start,
            })
            history.push(`/broker/account/events/${accountId}/?${query}`)
          }}
          onSelectEvent={(event) => {
            const query = queryString.stringify({
              action: 'view',
              id: event.id,
            })
            history.push(`/broker/account/events/${accountId}?${query}`)
          }}
          eventPropGetter={(e) => eventStyleGetter(e)}
        />
        <div
          css={`
            display: grid;
            justify-items: end;
          `}
        >
          <Core.Button
            style={{
              width: '150px',
              margin: '0px',
              marginTop: '10px',
              float: 'right',
            }}
            onClick={() => {
              const start = new Date()
              const query = queryString.stringify({
                action: 'create',
                mark: start,
              })
              history.push(`/broker/account/events/${accountId}/?${query}`)
            }}
          >
            Add Event
          </Core.Button>
        </div>
      </div>
      {action === 'create' ? (
        <CreateEvent
          isShowing={action === 'create'}
          close={() => history.goBack()}
        />
      ) : null}
      {action === 'view' ? <ViewEvent isShowing={action === 'view'} /> : null}
    </>
  )
}
