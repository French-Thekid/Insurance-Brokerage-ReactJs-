import React from 'react'
import { Route } from 'react-router-dom'
import Policies from './Policies'
import Policy from './policy'

export default function () {
  return (
    <>
      <Route
        exact
        path={`/broker/account/policies/:accountId`}
        component={Policies}
      />
      <Route
        // exact
        path={`/broker/account/policies/:accountId/:section/:policyID`}
        component={Policy}
      />
    </>
  )
}
