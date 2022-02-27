import React, { Suspense } from 'react'
import 'styled-components/macro'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Roles from './Roles'
import CreateRole from './CreateRole'
import ViewRole from './ViewRole'
import EditRole from './EditRole'
import Permissions from './Permissions/Permissions'
import ModifyPermissions from './Permissions/ModifyPermissions'
import ErrorPage from '../../ErrorPage'
import { Loading } from 'components'

export default function () {
  const match = useRouteMatch()
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={`${match.url}/`} component={Roles} />
        <Route path={`${match.url}/create-role`} component={CreateRole} />
        <Route path={`${match.url}/view-role/:roleId`} component={ViewRole} />
        <Route path={`${match.url}/edit-role/:roleId`} component={EditRole} />
        <Route
          path={`${match.url}/permissions/:roleID`}
          component={Permissions}
        />
        <Route
          path={`${match.url}/modify-permissions/:roleID`}
          component={ModifyPermissions}
        />
        <Route component={ErrorPage} />
      </Switch>
    </Suspense>
  )
}
