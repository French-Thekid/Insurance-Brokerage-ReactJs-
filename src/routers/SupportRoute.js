import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { SessionContext } from '../context'

function SupportRoute({ component: Component, ...rest }) {
  const {
    user: { role },
    hasValidSession,
  } = useContext(SessionContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        hasValidSession && role === 'SupportAdmin' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/broker/home" />
        )
      }
    />
  )
}
export default SupportRoute
