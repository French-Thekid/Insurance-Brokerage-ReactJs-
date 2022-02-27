import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { CreatePolicyForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => history.push(`/broker/account/policies/${accountId}`)}
      width="650px"
      title="Create Property Policy"
    >
      {permissions.POLICY_CREATE_TYPEACCOUNT ? (
        <CreatePolicyForm
          type="Property"
          close={() => history.push(`/broker/account/policies/${accountId}`)}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
