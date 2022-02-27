import React from 'react'
import { Route } from 'react-router-dom'
import PoliciesVersions from './VersionSelection'
import Policy from './policy'
import { useDialog } from 'hooks'
import { useHistory, useRouteMatch } from 'react-router-dom'
import 'styled-components/macro'

export default function () {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  return (
    <Dialog
      open={true}
      close={() =>
        history.push(
          `/broker/account/policies/${accountId}/details/${policyId}`
        )
      }
      title="Policy History"
    >
      <div
        css={`
          width: 90vw;
          height: 90vh;
        `}
      >
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/:policyID`}
          component={PoliciesVersions}
        />
        <Route
          exact
          path={`/broker/account/policies/:accountId/history/:section/:policyID`}
          component={Policy}
        />
      </div>
    </Dialog>
  )
}
