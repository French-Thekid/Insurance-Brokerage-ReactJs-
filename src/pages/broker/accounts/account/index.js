import React, { Suspense, useContext } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ErrorPage from '../../../ErrorPage'
import Details from './details/Details'
import Emails from './email/Emails'
import Events from './events'
import Documents from './documents/Documents'
import Slips from './slips'
import Policies from './policies'
import Receipts from './receipts'
import Notes from './notes/Notes'
import { Loading, Account } from 'components'
import { ColourContext } from 'context'

export default function () {
  const match = useRouteMatch()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: max-content 5fr;
        grid-column-gap: 10px;
        height: 100%;
        transition: ease-in-out 2s;
      `}
    >
      <Route
        path="/broker/account/:section/:accountId"
        component={Account.AccountSideBar}
      />
      <Account.AccountContainer>
        <Route
          path="/broker/account/:section/:accountId"
          component={Account.AccountNavBar}
        />
        <div
          css={`
            padding: 10px;
            overflow-y: auto;
            background: ${Colours.foreground};
          `}
        >
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                path={`${match.url}/details/:accountId`}
                component={Details}
              />
              <Route
                path={`${match.url}/email/:accountId`}
                component={Emails}
              />
              <Route
                path={`${match.url}/events/:accountId`}
                component={Events}
              />
              <Route
                path={`${match.url}/documents/:accountId`}
                component={Documents}
              />
              <Route path={`${match.url}/slips/:accountId`} component={Slips} />
              <Route
                path={`${match.url}/policies/:accountId`}
                component={Policies}
              />
              <Route path={`${match.url}/notes/:accountId`} component={Notes} />
              <Route
                path={`${match.url}/receipts/:accountId`}
                component={Receipts}
              />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
        </div>
      </Account.AccountContainer>
    </div>
  )
}
