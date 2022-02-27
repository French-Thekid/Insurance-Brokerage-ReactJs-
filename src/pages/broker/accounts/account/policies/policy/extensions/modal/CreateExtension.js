import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateExtensionForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Create Extension"
    >
      {permissions.RISK_CREATE_TYPEACCOUNT ? (
        <CreateExtensionForm close={() => history.goBack()} />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
