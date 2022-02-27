import React from 'react'
import { Route } from 'react-router-dom'
import Calendar from './Calendar'
import UpdateEvent from './UpdateEvent'
import 'styled-components/macro'

export default function () {
  return (
    <>
      <Route
        exact
        path={`/broker/account/events/:accountId`}
        component={Calendar}
      />
      <Route
        exact
        path={`/broker/account/events/:accountId/update/:id`}
        component={UpdateEvent}
      />
    </>
  )
}
