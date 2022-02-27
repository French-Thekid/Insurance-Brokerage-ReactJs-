import React from 'react'
import { Route } from 'react-router-dom'
import AccountsList from './AccountsList'

export default function ({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/`} component={AccountsList} />
    </>
  )
}
