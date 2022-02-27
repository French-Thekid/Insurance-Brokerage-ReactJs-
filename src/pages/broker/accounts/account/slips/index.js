import React from 'react'
import { Route } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'

import SlipsTable from './table'
import SlipPreview from './SlipPreview'
import PolicySelection from './PolicySelection'
import SlipGeneration from './slipGeneration'

export default function () {
  const match = useRouteMatch()
  return (
    <>
      <Route
        exact
        path={`/broker/account/slips/:accountId`}
        component={SlipsTable}
      />
      <Route exact path={`${match.url}/view-slip/`} component={SlipPreview} />
      <Route
        exact
        path={`${match.url}/policy-selection/:accountId`}
        component={PolicySelection}
      />
      <Route
        path={`${match.url}/slip-generation/:accountId`}
        component={SlipGeneration}
      />
    </>
  )
}
