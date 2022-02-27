import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Workflow from './workflows'
import ErrorPage from '../../ErrorPage'
import { Loading } from 'components'
import WorkflowEditor from './editor'

export default function () {
  const match = useRouteMatch()
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={`${match.url}/editor`} component={WorkflowEditor} />
        <Route exact path={`${match.url}/`} component={Workflow} />
        <Route component={ErrorPage} />
      </Switch>
    </Suspense>
  )
}
