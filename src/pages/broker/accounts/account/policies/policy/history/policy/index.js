import React from 'react'
import 'styled-components/macro'
import { Route } from 'react-router-dom'
import { PolicyComponents } from 'components'
import Details from './details'
import Insured from './insured'
import MotorRisks from './motorRisk'
import PropertyRisks from './nonMotorRisk'
import Extensions from './extensions'
import Limits from './limits'

export default function () {
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 10px;
        height: 100%;
        width: 100%;
      `}
    >
      <Route
        path={`/broker/account/policies/:accountId/history/:section/:policyId`}
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
          path={`/broker/account/policies/:accountId/history/details/:policyId`}
          component={Details}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/insureds/:policyId`}
          component={Insured}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/motorRisks/:policyId`}
          component={MotorRisks}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/nonMotorRisks/:policyId`}
          component={PropertyRisks}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/extensions/:policyId`}
          component={Extensions}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/limits/:policyId`}
          component={Limits}
        />
      </div>
    </div>
  )
}
