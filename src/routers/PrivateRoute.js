import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { SessionContext } from '../context'

function PrivateRoute({ component: Component, ...rest }) {
  const { hasValidSession } = useContext(SessionContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        hasValidSession ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}
export default PrivateRoute
