import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import ErrorPage from '../ErrorPage'
import SystemPreferences from './systemPreferences'
import Profile from './profile'
import Organization from './organization'
import Template from './templates'
import Workflow from './workflow'
import { Loading, SettingsSideBar, Layout } from 'components'

export default function () {
  const match = useRouteMatch()

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 5fr;
        grid-column-gap: 10px;
        height: 100%;
      `}
    >
      <SettingsSideBar />
      <Layout.Container>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={`${match.url}/`} component={SystemPreferences} />
            <Route path={`${match.url}/profile`} component={Profile} />
            <Route
              path={`${match.url}/organization`}
              component={Organization}
            />
            <Route path={`${match.url}/templates`} component={Template} />
            <Route path={`${match.url}/workflows`} component={Workflow} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </Layout.Container>
    </div>
  )
}
