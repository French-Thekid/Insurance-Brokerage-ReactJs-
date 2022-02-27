import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteSlipForm } from '../form'

export default function ({ isShowing, loading, error, deleteSlip }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Delete Slip"
    >
      {permissions.SLIP_DELETE_TYPEACCOUNT ? (
        <DeleteSlipForm
          close={() => history.goBack()}
          loading={loading}
          error={error}
          deleteSlip={deleteSlip}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
