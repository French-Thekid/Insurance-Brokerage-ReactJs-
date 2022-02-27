import React from 'react'
import { Route } from 'react-router-dom'
import Users from './Users'
import ViewUser from './ViewUsers'
import EditUser from './EditUser'
import CreateUser from './CreateUser'

export default function ({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/`} component={Users} />
      <Route
        exact
        path={`${match.url}/view-user/:userId`}
        component={ViewUser}
      />
      <Route
        exact
        path={`${match.url}/edit-user/:userId`}
        component={EditUser}
      />
      <Route exact path={`${match.url}/create-user/`} component={CreateUser} />
    </>
  )
}
