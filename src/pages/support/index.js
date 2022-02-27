import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { Layout, Loading } from 'components'
import ErrorPage from '../ErrorPage'
import List from './organisation/table'
import Settings from '../settings'

function Broker() {
  const match = useRouteMatch()
  return (
    <Layout.MainContainer type="Support">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={`${match.url}/organisation`} component={List} />
          <Route path={`${match.url}/settings`} component={Settings} />
          <Route component={ErrorPage} />
        </Switch>
      </Suspense>
    </Layout.MainContainer>
  )
}

export default Broker
