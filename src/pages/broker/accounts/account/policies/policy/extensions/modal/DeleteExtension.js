import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteExtensionForm } from '../forms'

export default function ({ isShowing, deletePolicyExtension, loading, error }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Delete Extension"
    >
      {permissions.RISK_DELETE_TYPEACCOUNT ? (
        <DeleteExtensionForm
          loading={loading}
          error={error}
          deletePolicyExtension={deletePolicyExtension}
          close={() => history.goBack()}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
