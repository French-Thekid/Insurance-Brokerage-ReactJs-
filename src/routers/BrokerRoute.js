import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { SessionContext } from '../context/session'

function BrokerRoute({ component: Component, ...rest }) {
  const { user } = useContext(SessionContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        user.role === 'AdminUser' || user.role === 'RegularUser' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/support/organisation" />
        )
      }
    />
  )
}
export default BrokerRoute
