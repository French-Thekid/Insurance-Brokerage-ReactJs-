import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { CreateMotorPolicyForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  const {
    params: { accountId },
  } = useRouteMatch()

  return (
    <Dialog
      open={isShowing}
      close={() => history.push(`/broker/account/policies/${accountId}`)}
      width="650px"
      title="Create Motor Policy"
    >
      {permissions.POLICY_CREATE_TYPEACCOUNT ? (
        <CreateMotorPolicyForm
          type="Motor"
          close={() => history.push(`/broker/account/policies/${accountId}`)}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
