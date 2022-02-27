import React from 'react'
import 'styled-components/macro'
import { Route } from 'react-router-dom'
import Details from './details'
import Extensions from './extensions'
import Limits from './limits'
import MotorRisks from './motorRisk'
import NonMotorRisk from './nonMotorRisk'
import Insureds from './insured'
import History from './history'

import { PolicyComponents } from 'components'
import Renewals from './renewals'

export default function () {
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 10px;
        height: 100%;
      `}
    >
      <Route
        path={`/broker/account/policies/:accountId/:section/:policyId`}
        component={PolicyComponents.PolicyNavBar}
      />
      <div
        css={`
          height: calc(100%);
          overflow-y: auto;
        `}
      >
        <Route
          exact
          path={`/broker/account/policies/:accountId/details/:policyId`}
          component={Details}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/insureds/:policyId`}
          component={Insureds}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/motorRisks/:policyId`}
          component={MotorRisks}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/nonMotorRisks/:policyId`}
          component={NonMotorRisk}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/extensions/:policyId`}
          component={Extensions}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/limits/:policyId`}
          component={Limits}
        />
        <Route
          path={`/broker/account/policies/:accountId/history/:policyId`}
          component={History}
        />
        <Route
          path={`/broker/account/policies/:accountId/renewals/:policyId`}
          component={Renewals}
        />
      </div>
    </div>
  )
}
