import React, { Suspense, useContext } from 'react'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { Layout, Loading } from 'components'
import ErrorPage from '../ErrorPage'
import Home from './home'
import Accounts from './accounts'
import Account from './accounts/account'
import Settings from '../settings'
import Insurers from './Insurers'
import Branches from './branches'
// import { ActivityLogs } from './logs'
import Users from './users'
import Roles from './roles'
import Ivis from './ivis'
import WorkflowHUD from './accounts/account/details/WorkflowHUD'
import BrokerRoute from '../../routers/BrokerRoute'
import { OrganisationContext, WalkthroughContext } from '../../context'
import { useTitle } from '../../hooks'

function Broker() {
  const history = useHistory()
  const match = useRouteMatch()
  const walkthrough = useContext(WalkthroughContext)
  const { orgName, logoUrl } = useContext(OrganisationContext)
  useTitle(orgName, logoUrl)
  return (
    <Layout.MainContainer type="Broker">
      {walkthrough.active || localStorage.getItem('walkthroughId') ? (
        <WorkflowHUD data={walkthrough} history={history} />
      ) : null}
      <Suspense fallback={<Loading />}>
        <Switch>
          <BrokerRoute path={`${match.url}/home`} component={Home} />
          (
          <BrokerRoute path={`${match.url}/accounts`} component={Accounts} />)
          <BrokerRoute path={`${match.url}/account`} component={Account} />
          <BrokerRoute path={`${match.url}/users`} component={Users} />
          <BrokerRoute path={`${match.url}/insurers`} component={Insurers} />
          <BrokerRoute path={`${match.url}/branches`} component={Branches} />
          <BrokerRoute path={`${match.url}/ivis`} component={Ivis} />
          {/* TODO FUTURE RELEASE */}
          {/* <BrokerRoute path={`${match.url}/log`} component={ActivityLogs} /> */}
          <BrokerRoute path={`${match.url}/roles`} component={Roles} />
          <BrokerRoute path={`${match.url}/settings`} component={Settings} />
          <BrokerRoute component={ErrorPage} />
        </Switch>
      </Suspense>
    </Layout.MainContainer>
  )
}

export default Broker
